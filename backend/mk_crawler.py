"""
매일경제(매경) 뉴스 크롤러
카테고리별 기사 수집 및 파일/DB 저장
번호 기반 크롤링 지원
"""

import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time
import re
import json
import csv
import os
import sys
import argparse
from typing import List, Dict, Optional, Any
from urllib.parse import urljoin, urlparse
import logging

# 로깅 설정
log_file = 'mk_crawler.log'
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8', mode='a'),  # append 모드
        logging.StreamHandler()
    ],
    force=True  # 기존 핸들러 덮어쓰기
)
logger = logging.getLogger(__name__)
logger.info(f"로그 파일: {os.path.abspath(log_file)}")

sys.stdout.reconfigure(encoding='utf-8')

# 매경 카테고리 매핑 (한글명: 슬러그)
MK_CATEGORIES = {
    "경제": "economy",
    "정치": "politics",
    "사회": "society",
    "국제": "world",
    "기업": "business",
    "증권": "stock",
    "부동산": "realestate",
    "IT": "it",
    "문화": "culture",
    "스포츠": "sports"
}


class MKCrawler:
    """매경 뉴스 크롤러 (번호 기반 크롤링 지원)"""
    
    def __init__(self, delay: float = 0.5, max_retries: int = 3, backoff_factor: float = 2.0):
        """
        Args:
            delay: 요청 간 대기 시간 (초, 서버 부하 방지)
            max_retries: 최대 재시도 횟수 (429 등 에러 시)
            backoff_factor: 재시도 시 대기 시간 배수 (지수 백오프)
        """
        self.base_url = "https://www.mk.co.kr"
        self.delay = delay
        self.max_retries = max_retries
        self.backoff_factor = backoff_factor
        self.session = requests.Session()
        
        # User-Agent 설정 (매경 robots.txt 준수)
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Referer': 'https://www.mk.co.kr/'
        })
        
        # 크롤링된 기사 URL 추적 (중복 방지)
        self.crawled_urls = set()
        
        # 요청 통계
        self.stats = {
            'total_requests': 0,
            'success_count': 0,
            'not_found_count': 0,
            'error_count': 0
        }
    
    def get_article_by_number(self, category: str, article_id: int) -> Optional[Dict[str, Any]]:
        """
        번호로 기사 가져오기
        
        Args:
            category: 카테고리 슬러그 (예: "economy", "stock")
            article_id: 기사 번호
            
        Returns:
            기사 정보 딕셔너리 또는 None
        """
        url = f"{self.base_url}/news/{category}/{article_id}"
        
        for attempt in range(self.max_retries):
            try:
                self.stats['total_requests'] += 1
                response = self.session.get(url, timeout=10)
                
                # 404 Not Found - 해당 번호의 기사가 없음
                if response.status_code == 404:
                    self.stats['not_found_count'] += 1
                    return None
                
                response.raise_for_status()
                response.encoding = 'utf-8'
                
                soup = BeautifulSoup(response.text, 'lxml')
                
                # 제목 추출
                title = self._extract_title(soup)
                if not title:
                    logger.debug(f"제목을 찾을 수 없음: {url}")
                    return None
                
                # 본문 추출
                content = self._extract_content(soup)
                if not content or len(content.strip()) < 100:
                    logger.debug(f"본문이 너무 짧음: {url}")
                    return None
                
                # 기사 정보 추출
                article = {
                    'article_id': str(article_id),
                    'title': title,
                    'subtitle': self._extract_subtitle(soup),
                    'content': content,
                    'published_at': self._extract_published_date(soup),
                    'category': self._get_category_name(category),
                    'category_slug': category,
                    'reporter': self._extract_reporter(soup),
                    'image_url': self._extract_main_image(soup),
                    'url': url,
                    'crawled_at': datetime.now().isoformat()
                }
                
                self.stats['success_count'] += 1
                return article
                
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 404:
                    self.stats['not_found_count'] += 1
                    return None
                logger.warning(f"HTTP 에러 ({url}): {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(self.delay * (attempt + 1))
                    continue
                self.stats['error_count'] += 1
                return None
                
            except Exception as e:
                logger.error(f"기사 크롤링 에러 ({url}): {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(self.delay * (attempt + 1))
                    continue
                self.stats['error_count'] += 1
                return None
        
        return None
    
    def crawl_by_number_range(self, category: str, start_number: int, end_number: int = None,
                              max_articles: int = None) -> List[Dict[str, Any]]:
        """
        번호 범위로 크롤링
        
        Args:
            category: 카테고리 슬러그 (예: "economy", "stock")
            start_number: 시작 번호 (큰 번호, 최신)
            end_number: 종료 번호 (작은 번호, 과거). None이면 max_articles만큼만 수집
            max_articles: 최대 수집 기사 수 (None이면 범위 끝까지)
            
        Returns:
            크롤링된 기사 리스트
        """
        category_name = self._get_category_name(category)
        
        print(f"\n{'='*70}")
        print(f"📰 [{category_name}] 번호 기반 크롤링 시작")
        print(f"카테고리: {category} ({category_name})")
        print(f"시작 번호 (최신): {start_number}")
        if end_number:
            print(f"종료 번호 (과거): {end_number}")
            print(f"번호 범위: {end_number} ~ {start_number} (번호를 줄여가며 역순 크롤링)")
        if max_articles:
            print(f"최대 수집 기사 수: {max_articles}개")
        print(f"{'='*70}")
        sys.stdout.flush()
        logger.info(f"\n{'='*70}")
        logger.info(f"📰 [{category_name}] 번호 기반 크롤링 시작")
        logger.info(f"카테고리: {category} ({category_name})")
        logger.info(f"시작 번호: {start_number}")
        if end_number:
            logger.info(f"종료 번호: {end_number}")
            logger.info(f"번호 범위: {end_number} ~ {start_number} (역순 크롤링)")
        if max_articles:
            logger.info(f"최대 수집 기사 수: {max_articles}개")
        logger.info(f"{'='*70}")
        
        articles = []
        current_number = start_number
        total_checked = 0
        
        # end_number가 없으면 max_articles 기반으로 추정 (연속 50개 없으면 중단)
        if end_number is None:
            consecutive_not_found = 0
            max_consecutive_not_found = 50
            
            while max_articles is None or len(articles) < max_articles:
                article = self.get_article_by_number(category, current_number)
                total_checked += 1
                
                if article:
                    articles.append(article)
                    consecutive_not_found = 0
                    
                    if len(articles) % 10 == 0:
                        print(f"  ✅ {len(articles)}개 수집 완료 (현재 번호: {current_number})")
                        sys.stdout.flush()
                        logger.info(f"  ✅ {len(articles)}개 수집 완료 (현재 번호: {current_number})")
                    
                    if max_articles and len(articles) >= max_articles:
                        print(f"\n  🎯 목표 기사 수({max_articles}개) 도달! 크롤링 중단")
                        sys.stdout.flush()
                        logger.info(f"\n  🎯 목표 기사 수({max_articles}개) 도달! 크롤링 중단")
                        break
                else:
                    consecutive_not_found += 1
                    if consecutive_not_found >= max_consecutive_not_found:
                        print(f"  ⚠️  연속 {max_consecutive_not_found}개 기사를 찾지 못해 중단")
                        sys.stdout.flush()
                        logger.info(f"  ⚠️  연속 {max_consecutive_not_found}개 기사를 찾지 못해 중단")
                        break
                
                current_number -= 1  # 번호를 1씩 줄여가며 탐색 (최신 → 과거)
                time.sleep(self.delay)
                
                # 진행 상황 출력 (100개마다)
                if total_checked % 100 == 0:
                    print(f"  📊 진행률: {total_checked}개 확인, {len(articles)}개 수집 (현재 번호: {current_number})")
                    sys.stdout.flush()
                    logger.info(f"  📊 진행률: {total_checked}개 확인, {len(articles)}개 수집 (현재 번호: {current_number})")
        else:
            # end_number가 지정된 경우 범위 내에서 크롤링
            while current_number >= end_number:
                article = self.get_article_by_number(category, current_number)
                total_checked += 1
                
                if article:
                    articles.append(article)
                    if len(articles) % 10 == 0:
                        print(f"  ✅ {len(articles)}개 수집 완료 (현재 번호: {current_number})")
                        sys.stdout.flush()
                        logger.info(f"  ✅ {len(articles)}개 수집 완료 (현재 번호: {current_number})")
                    
                    # 최대 기사 수 도달 시 중단
                    if max_articles and len(articles) >= max_articles:
                        print(f"\n  🎯 목표 기사 수({max_articles}개) 도달! 크롤링 중단")
                        sys.stdout.flush()
                        logger.info(f"\n  🎯 목표 기사 수({max_articles}개) 도달! 크롤링 중단")
                        break
                
                current_number -= 1  # 번호를 1씩 줄여가며 탐색 (최신 → 과거)
                
                # 진행 상황 출력 (100개마다)
                if total_checked % 100 == 0:
                    progress = ((start_number - current_number) / (start_number - end_number + 1)) * 100
                    print(f"  📊 진행률: {progress:.1f}% ({total_checked}개 확인, {len(articles)}개 수집)")
                    sys.stdout.flush()
                    logger.info(f"  📊 진행률: {progress:.1f}% ({total_checked}개 확인, {len(articles)}개 수집)")
                
                time.sleep(self.delay)
        
        # 크롤링 완료 출력
        print(f"\n{'='*70}")
        print(f"✅ 크롤링 완료!")
        print(f"{'='*70}")
        print(f"총 확인한 번호: {total_checked}개")
        print(f"수집된 기사: {len(articles)}개")
        if total_checked > 0:
            print(f"수집률: {len(articles)/total_checked*100:.2f}%")
        print(f"\n요청 통계:")
        print(f"  - 총 요청: {self.stats['total_requests']}개")
        print(f"  - 성공: {self.stats['success_count']}개")
        print(f"  - 404 (없음): {self.stats['not_found_count']}개")
        print(f"  - 에러: {self.stats['error_count']}개")
        print(f"{'='*70}\n")
        sys.stdout.flush()
        logger.info(f"\n{'='*70}")
        logger.info(f"✅ 크롤링 완료!")
        logger.info(f"{'='*70}")
        logger.info(f"총 확인한 번호: {total_checked}개")
        logger.info(f"수집된 기사: {len(articles)}개")
        if total_checked > 0:
            logger.info(f"수집률: {len(articles)/total_checked*100:.2f}%")
        logger.info(f"\n요청 통계:")
        logger.info(f"  - 총 요청: {self.stats['total_requests']}개")
        logger.info(f"  - 성공: {self.stats['success_count']}개")
        logger.info(f"  - 404 (없음): {self.stats['not_found_count']}개")
        logger.info(f"  - 에러: {self.stats['error_count']}개")
        logger.info(f"{'='*70}\n")
        
        return articles
    
    def _get_category_name(self, category_slug: str) -> str:
        """카테고리 슬러그를 한글 이름으로 변환"""
        for name, slug in MK_CATEGORIES.items():
            if slug == category_slug:
                return name
        return category_slug
    
    def _extract_title(self, soup: BeautifulSoup) -> str:
        """제목 추출"""
        title_selectors = [
            '.news_ttl',
            'h1.news_ttl',
            '.article_headline',
            'h1.article_title',
            'h1.title',
            'h1',
            'meta[property="og:title"]'
        ]
        
        for selector in title_selectors:
            elem = soup.select_one(selector)
            if elem:
                if selector.startswith('meta'):
                    title = elem.get('content', '').strip()
                else:
                    title = elem.get_text(strip=True)
                if title:
                    return title
        return ""
    
    def _extract_subtitle(self, soup: BeautifulSoup) -> str:
        """부제목 추출"""
        subtitle_selectors = [
            '.news_sub_ttl',
            '.article_subtitle',
            '.subtitle',
            '.summary'
        ]
        
        for selector in subtitle_selectors:
            elem = soup.select_one(selector)
            if elem:
                subtitle = elem.get_text(strip=True)
                if subtitle:
                    return subtitle
        return ""
    
    def _extract_content(self, soup: BeautifulSoup) -> str:
        """본문 추출"""
        # 불필요한 태그 제거
        for tag in soup.select('script, style, aside, .ad_wrap, .advertisement, .social_share, .comment'):
            tag.decompose()
        
        content_selectors = [
            '.news_cnt_detail_wrap',
            '.article_body',
            '.news_content',
            '.article_content',
            '.content_body',
            'article .content',
            '.story_body',
            '#articleBody'
        ]
        
        for selector in content_selectors:
            content_elem = soup.select_one(selector)
            if content_elem:
                content = content_elem.get_text(separator='\n', strip=True)
                content = re.sub(r'\n{3,}', '\n\n', content)
                if len(content) > 100:
                    return content
        
        # 본문을 찾지 못한 경우 p 태그들로 시도
        paragraphs = soup.select('article p, .article p, .content p')
        if paragraphs:
            content_parts = [p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True)]
            content = '\n\n'.join(content_parts)
            if len(content) > 100:
                return content
        
        return ""
    
    def _extract_published_date(self, soup: BeautifulSoup) -> str:
        """작성 시간 추출"""
        date_selectors = [
            '.news_date',
            '.article_date',
            '.published_date',
            'time[datetime]',
            '.date',
            'meta[property="article:published_time"]',
            'meta[name="publish-date"]'
        ]
        
        for selector in date_selectors:
            elem = soup.select_one(selector)
            if elem:
                if selector.startswith('meta'):
                    date_str = elem.get('content', '').strip()
                elif selector.startswith('time'):
                    date_str = elem.get('datetime', '').strip() or elem.get_text(strip=True)
                else:
                    date_str = elem.get_text(strip=True)
                
                if date_str:
                    return date_str
        return ""
    
    def _extract_reporter(self, soup: BeautifulSoup) -> str:
        """기자 추출"""
        reporter_selectors = [
            '.journalist_name',
            '.reporter',
            '.author',
            '.writer',
            'meta[name="author"]'
        ]
        
        for selector in reporter_selectors:
            elem = soup.select_one(selector)
            if elem:
                if selector.startswith('meta'):
                    reporter = elem.get('content', '').strip()
                else:
                    reporter = elem.get_text(strip=True)
                if reporter:
                    reporter = re.sub(r'\s+', ' ', reporter).strip()
                    return reporter
        return ""
    
    def _extract_main_image(self, soup: BeautifulSoup) -> str:
        """메인 이미지 URL 추출"""
        # og:image 메타 태그
        og_image = soup.select_one('meta[property="og:image"]')
        if og_image:
            img_url = og_image.get('content', '').strip()
            if img_url:
                return img_url
        
        # 본문의 첫 번째 이미지
        img_selectors = [
            '.news_cnt_detail_wrap img',
            '.article_body img',
            'article img',
            '.content img'
        ]
        
        for selector in img_selectors:
            img = soup.select_one(selector)
            if img and img.get('src'):
                src = img.get('src', '')
                if src.startswith('http'):
                    return src
                elif src.startswith('//'):
                    return 'https:' + src
                else:
                    return urljoin(self.base_url, src)
        
        return ""


class DataStorage:
    """크롤링 데이터 저장 클래스"""
    
    def __init__(self, output_dir: str = "crawled_data"):
        """
        Args:
            output_dir: 저장 디렉토리
        """
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
    
    def save_to_json(self, articles: List[Dict[str, Any]], filename: str = None):
        """
        JSON 파일로 저장
        
        Args:
            articles: 기사 리스트
            filename: 파일명 (None이면 자동 생성)
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"mk_news_{timestamp}.json"
        
        filepath = os.path.join(self.output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(articles, f, ensure_ascii=False, indent=2)
        
        logger.info(f"✅ JSON 파일 저장 완료: {filepath} ({len(articles)}개 기사)")
        return filepath
    
    def save_to_csv(self, articles: List[Dict[str, Any]], filename: str = None):
        """
        CSV 파일로 저장
        
        Args:
            articles: 기사 리스트
            filename: 파일명 (None이면 자동 생성)
        """
        if not articles:
            logger.warning("저장할 기사가 없습니다.")
            return None
        
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"mk_news_{timestamp}.csv"
        
        filepath = os.path.join(self.output_dir, filename)
        
        # CSV 필드 정의
        fieldnames = ['article_id', 'title', 'subtitle', 'category', 'category_slug', 
                     'reporter', 'published_at', 'url', 'image_url', 'content', 'crawled_at']
        
        with open(filepath, 'w', newline='', encoding='utf-8-sig') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
            writer.writeheader()
            
            for article in articles:
                writer.writerow(article)
        
        logger.info(f"✅ CSV 파일 저장 완료: {filepath} ({len(articles)}개 기사)")
        return filepath


def main():
    parser = argparse.ArgumentParser(
        description='매경 뉴스 번호 기반 크롤러',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
사용 예시:
  # 경제 카테고리, 최신 번호 11485290부터 100개 수집 (번호를 줄여가며 탐색)
  python mk_crawler.py --category economy --start 11485290 --max-articles 100
  
  # 증권 카테고리, 번호 범위 11484948 ~ 11484000 크롤링 (11484948에서 1씩 줄여가며 11484000까지)
  python mk_crawler.py --category stock --start 11484948 --end 11484000
  
  # 경제 카테고리, 최신 번호에서 100개 수집 (범위 지정 없음, 빠른 크롤링)
  python mk_crawler.py --category economy --start 11485290 --max-articles 100 --delay 0.2
        """
    )
    
    parser.add_argument('--category', type=str, required=True,
                       help='크롤링할 카테고리 (예: economy, stock, business)')
    parser.add_argument('--start', type=int, required=True,
                       help='시작 번호 (마지막 번호, 최신 기사, 큰 번호). 이 번호에서부터 1씩 줄여가며 탐색')
    parser.add_argument('--end', type=int, default=None,
                       help='종료 번호 (과거 기사, 작은 번호). 지정하지 않으면 max-articles만큼만 수집')
    parser.add_argument('--max-articles', type=int, default=None,
                       help='최대 수집 기사 수 (도달 시 자동 중단)')
    parser.add_argument('--delay', type=float, default=0.5,
                       help='요청 간 대기 시간(초) (기본: 0.5)')
    parser.add_argument('--output-dir', type=str, default='crawled_data',
                       help='저장 디렉토리 (기본: crawled_data)')
    
    args = parser.parse_args()
    
    # 시작 로그
    logger.info("=" * 70)
    logger.info("매경 뉴스 크롤러 시작")
    logger.info(f"로그 파일: {os.path.abspath(log_file)}")
    logger.info("=" * 70)
    
    # 유효성 검사
    if args.category not in MK_CATEGORIES.values():
        error_msg = f"❌ 오류: '{args.category}' 카테고리를 찾을 수 없습니다.\n\n사용 가능한 카테고리:"
        logger.error(error_msg)
        print(error_msg)
        for name, slug in MK_CATEGORIES.items():
            cat_info = f"  {slug:15s} ({name})"
            logger.info(cat_info)
            print(cat_info)
        sys.exit(1)
    
    if args.end is not None and args.start < args.end:
        error_msg = f"❌ 오류: 시작 번호가 종료 번호보다 작습니다.\n   시작 번호는 종료 번호보다 커야 합니다. (현재: {args.start} < {args.end})"
        logger.error(error_msg)
        print(error_msg)
        sys.exit(1)
    
    if args.end is None and args.max_articles is None:
        error_msg = "❌ 오류: --end 또는 --max-articles 중 하나는 반드시 지정해야 합니다."
        logger.error(error_msg)
        print(error_msg)
        sys.exit(1)
    
    # 크롤러 생성
    logger.info(f"크롤러 초기화 완료 (delay: {args.delay}초)")
    crawler = MKCrawler(delay=args.delay)
    storage = DataStorage(output_dir=args.output_dir)
    
    # 크롤링 실행
    try:
        articles = crawler.crawl_by_number_range(
            category=args.category,
            start_number=args.start,
            end_number=args.end,
            max_articles=args.max_articles
        )
        
        # 결과 저장
        if articles:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            category_name = crawler._get_category_name(args.category)
            
            json_file = storage.save_to_json(
                articles, 
                f"mk_news_{args.category}_{timestamp}.json"
            )
            csv_file = storage.save_to_csv(
                articles,
                f"mk_news_{args.category}_{timestamp}.csv"
            )
            
            result_msg = "\n" + "=" * 70 + "\n📁 저장된 파일:\n"
            result_msg += f"  JSON: {json_file}\n"
            result_msg += f"  CSV: {csv_file}\n"
            result_msg += "=" * 70
            logger.info(result_msg)
            print(result_msg)
            
            # 번호 범위 정보
            article_ids = [int(a['article_id']) for a in articles]
            range_msg = f"\n수집된 기사 번호 범위: {min(article_ids)} ~ {max(article_ids)}"
            logger.info(range_msg)
            print(range_msg)
        else:
            no_articles_msg = "\n❌ 수집된 기사가 없습니다."
            logger.warning(no_articles_msg)
            print(no_articles_msg)
            
    except KeyboardInterrupt:
        interrupt_msg = "\n\n⚠️  사용자에 의해 중단되었습니다."
        logger.warning(interrupt_msg)
        print(interrupt_msg)
        sys.exit(0)
    except Exception as e:
        error_msg = f"\n❌ 오류 발생: {e}"
        logger.error(error_msg, exc_info=True)
        print(error_msg)
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
