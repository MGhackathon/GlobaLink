"""
URL 리스트 기반 매경 뉴스 크롤러
특정 URL들을 직접 크롤링
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
from typing import List, Dict, Optional, Any
from urllib.parse import urlparse
import logging

# 로깅 설정
log_file = 'mk_crawler_link.log'
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8', mode='a'),
        logging.StreamHandler()
    ],
    force=True
)
logger = logging.getLogger(__name__)

sys.stdout.reconfigure(encoding='utf-8')


class MKLinkCrawler:
    """매경 뉴스 URL 기반 크롤러"""
    
    def __init__(self, delay: float = 0.3):
        """
        Args:
            delay: 요청 간 대기 시간 (초)
        """
        self.base_url = "https://www.mk.co.kr"
        self.delay = delay
        self.session = requests.Session()
        
        # User-Agent 설정
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Referer': 'https://www.mk.co.kr/'
        })
        
        self.stats = {
            'total_requests': 0,
            'success_count': 0,
            'failed_count': 0
        }
    
    def extract_category_and_id(self, url: str) -> tuple:
        """URL에서 카테고리와 기사 ID 추출"""
        # 예: https://www.mk.co.kr/news/economy/11485397
        parsed = urlparse(url)
        parts = parsed.path.strip('/').split('/')
        
        if len(parts) >= 3 and parts[0] == 'news':
            category = parts[1]
            article_id = parts[2]
            return category, article_id
        return None, None
    
    def get_article_by_url(self, url: str) -> Optional[Dict[str, Any]]:
        """
        URL로 기사 가져오기
        
        Args:
            url: 기사 URL
            
        Returns:
            기사 정보 딕셔너리 또는 None
        """
        try:
            self.stats['total_requests'] += 1
            
            print(f"  🔍 크롤링: {url}")
            logger.info(f"크롤링: {url}")
            
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            response.encoding = 'utf-8'
            
            soup = BeautifulSoup(response.text, 'lxml')
            
            # 제목 추출
            title = self._extract_title(soup)
            if not title:
                logger.warning(f"제목을 찾을 수 없음: {url}")
                self.stats['failed_count'] += 1
                return None
            
            # 본문 추출
            content = self._extract_content(soup)
            if not content or len(content.strip()) < 100:
                logger.warning(f"본문이 너무 짧음: {url}")
                self.stats['failed_count'] += 1
                return None
            
            # URL에서 카테고리와 ID 추출
            category_slug, article_id = self.extract_category_and_id(url)
            
            # 기사 정보 추출
            article = {
                'article_id': article_id,
                'title': title,
                'subtitle': self._extract_subtitle(soup),
                'content': content,
                'published_at': self._extract_published_date(soup),
                'category': self._get_category_name(category_slug) if category_slug else "",
                'category_slug': category_slug or "",
                'reporter': self._extract_reporter(soup),
                'image_url': self._extract_main_image(soup),
                'url': url,
                'crawled_at': datetime.now().isoformat()
            }
            
            self.stats['success_count'] += 1
            print(f"  ✅ 성공: {title}")
            return article
            
        except requests.exceptions.HTTPError as e:
            logger.error(f"HTTP 에러 ({url}): {e}")
            self.stats['failed_count'] += 1
            return None
        except Exception as e:
            logger.error(f"크롤링 에러 ({url}): {e}")
            self.stats['failed_count'] += 1
            return None
    
    def crawl_urls(self, urls: List[str]) -> List[Dict[str, Any]]:
        """
        URL 리스트 크롤링
        
        Args:
            urls: 크롤링할 URL 리스트
            
        Returns:
            크롤링된 기사 리스트
        """
        print(f"\n{'='*70}")
        print(f"📰 URL 리스트 크롤링 시작")
        print(f"총 {len(urls)}개 URL")
        print(f"{'='*70}\n")
        
        articles = []
        
        for i, url in enumerate(urls, 1):
            print(f"\n[{i}/{len(urls)}]")
            article = self.get_article_by_url(url)
            
            if article:
                articles.append(article)
            
            # 마지막 URL이 아니면 대기
            if i < len(urls):
                time.sleep(self.delay)
        
        # 결과 출력
        print(f"\n{'='*70}")
        print(f"✅ 크롤링 완료!")
        print(f"{'='*70}")
        print(f"총 요청: {self.stats['total_requests']}개")
        print(f"성공: {self.stats['success_count']}개")
        print(f"실패: {self.stats['failed_count']}개")
        print(f"{'='*70}\n")
        
        return articles
    
    def _get_category_name(self, category_slug: str) -> str:
        """카테고리 슬러그를 한글 이름으로 변환"""
        category_map = {
            "economy": "경제",
            "politics": "정치",
            "society": "사회",
            "world": "국제",
            "business": "기업",
            "stock": "증권",
            "realestate": "부동산",
            "it": "IT",
            "culture": "문화",
            "sports": "스포츠",
            "hot-issues": "핫이슈"
        }
        return category_map.get(category_slug, category_slug)
    
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
        from urllib.parse import urljoin
        
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


def save_to_json(articles: List[Dict[str, Any]], filename: str = None, output_dir: str = "../DB/crawling"):
    """JSON 파일로 저장"""
    os.makedirs(output_dir, exist_ok=True)
    
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"mk_news_links_{timestamp}.json"
    
    filepath = os.path.join(output_dir, filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    
    logger.info(f"✅ JSON 파일 저장 완료: {filepath} ({len(articles)}개 기사)")
    print(f"✅ JSON 파일 저장: {filepath}")
    return filepath


def save_to_csv(articles: List[Dict[str, Any]], filename: str = None, output_dir: str = "../DB/crawling"):
    """CSV 파일로 저장"""
    if not articles:
        logger.warning("저장할 기사가 없습니다.")
        return None
    
    os.makedirs(output_dir, exist_ok=True)
    
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"mk_news_links_{timestamp}.csv"
    
    filepath = os.path.join(output_dir, filename)
    
    # CSV 필드 정의
    fieldnames = ['article_id', 'title', 'subtitle', 'category', 'category_slug', 
                 'reporter', 'published_at', 'url', 'image_url', 'content', 'crawled_at']
    
    with open(filepath, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
        writer.writeheader()
        
        for article in articles:
            writer.writerow(article)
    
    logger.info(f"✅ CSV 파일 저장 완료: {filepath} ({len(articles)}개 기사)")
    print(f"✅ CSV 파일 저장: {filepath}")
    return filepath


def main():
    # 크롤링할 URL 리스트
    urls = [
        "https://www.mk.co.kr/news/economy/11485397",
        "https://www.mk.co.kr/news/politics/11485490",
        "https://www.mk.co.kr/news/it/11485059",
        "https://www.mk.co.kr/news/it/11485458",
        "https://www.mk.co.kr/news/world/11485582",
        "https://www.mk.co.kr/news/hot-issues/11485576",
        "https://www.mk.co.kr/news/economy/11485396",
        "https://www.mk.co.kr/news/politics/11485596"
    ]
    
    print("=" * 70)
    print("매경 뉴스 URL 크롤러 시작")
    print(f"로그 파일: {os.path.abspath(log_file)}")
    print("=" * 70)
    
    # 크롤러 생성 및 실행
    crawler = MKLinkCrawler(delay=0.3)
    
    try:
        articles = crawler.crawl_urls(urls)
        
        # 결과 저장
        if articles:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            
            json_file = save_to_json(articles, f"mk_news_links_{timestamp}.json")
            csv_file = save_to_csv(articles, f"mk_news_links_{timestamp}.csv")
            
            print(f"\n{'='*70}")
            print(f"📁 저장 완료")
            print(f"{'='*70}")
            print(f"  JSON: {json_file}")
            print(f"  CSV: {csv_file}")
            print(f"{'='*70}\n")
        else:
            print("\n❌ 수집된 기사가 없습니다.")
            
    except KeyboardInterrupt:
        print("\n\n⚠️  사용자에 의해 중단되었습니다.")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
