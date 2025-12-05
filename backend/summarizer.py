"""
뉴스 기사 요약 시스템
OpenAI API를 사용하여 크롤링된 뉴스 기사를 요약
"""

import json
import os
from typing import List, Dict, Any, Optional
from datetime import datetime
import time
from openai import OpenAI
from dotenv import load_dotenv
import sys

# 환경변수 로드
load_dotenv()

sys.stdout.reconfigure(encoding='utf-8')


class NewsSummarizer:
    """OpenAI를 사용한 뉴스 요약 클래스"""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Args:
            api_key: OpenAI API 키 (None이면 환경변수에서 가져옴)
        """
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        
        if not self.api_key:
            raise ValueError("OpenAI API 키가 설정되지 않았습니다. 환경변수 OPENAI_API_KEY를 설정하거나 api_key 매개변수를 전달하세요.")
        
        self.client = OpenAI(api_key=self.api_key)
        
        # 요약 프롬프트 설정
        self.system_prompt = """당신은 전문 뉴스 에디터입니다. 
주어진 뉴스 기사를 읽고 핵심 내용을 짧고 간결하게 요약해주세요.

요약 규칙:
1. 5-6줄 이내로 핵심만 요약
2. 각 줄은 한 문장으로 짧고 간결하게 작성
3. 불필요한 수식어나 접속사 최소화
4. 핵심 키워드와 주요 수치를 포함
5. 명사형 종결이나 체언 종지 활용
6. 객관적이고 팩트 중심으로 작성

예시 형식:
현대차 5일 주가 11% 급등
로봇·자율주행 양날개로 질주
보스턴다이나믹스 가치 부각
자율주행 빅테크 협업도 호재
"""
        
        # 통계
        self.stats = {
            'total_articles': 0,
            'success_count': 0,
            'error_count': 0,
            'total_tokens_used': 0,
            'total_cost': 0.0
        }
    
    def summarize_article(self, article: Dict[str, Any], max_tokens: int = 500) -> Dict[str, Any]:
        """
        단일 기사 요약
        
        Args:
            article: 기사 데이터 딕셔너리
            max_tokens: 최대 토큰 수
            
        Returns:
            요약 결과 딕셔너리
        """
        try:
            title = article.get('title', '')
            content = article.get('content', '')
            image_url = article.get('image_url', '')
            category = article.get('category', '')
            url = article.get('url', '')
            published_at = article.get('published_at', '')
            
            if not content or len(content.strip()) < 100:
                return {
                    'success': False,
                    'error': '기사 본문이 너무 짧습니다.',
                    'article_id': article.get('article_id', ''),
                    'image_url': image_url
                }
            
            # 본문이 너무 길면 일부만 사용 (GPT-3.5-turbo 토큰 제한 고려)
            if len(content) > 8000:
                content = content[:8000] + "..."
            
            # 요약 요청
            user_prompt = f"제목: {title}\n\n본문:\n{content}"
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=max_tokens,
                temperature=0.3,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0
            )
            
            summary = response.choices[0].message.content.strip()
            
            # 통계 업데이트
            tokens_used = response.usage.total_tokens
            self.stats['total_tokens_used'] += tokens_used
            self.stats['success_count'] += 1
            
            # 비용 계산 (GPT-3.5-turbo 기준: input $0.0015/1K tokens, output $0.002/1K tokens)
            # 간단히 평균 $0.00175/1K tokens로 계산
            cost = (tokens_used / 1000) * 0.00175
            self.stats['total_cost'] += cost
            
            return {
                'success': True,
                'article_id': article.get('article_id', ''),
                'original_title': title,
                'summary': summary,
                'image_url': image_url,
                'category': category,
                'url': url,
                'published_at': published_at,
                'tokens_used': tokens_used,
                'cost': cost,
                'summarized_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            self.stats['error_count'] += 1
            return {
                'success': False,
                'error': str(e),
                'article_id': article.get('article_id', ''),
                'image_url': article.get('image_url', ''),
                'category': article.get('category', ''),
                'url': article.get('url', ''),
                'published_at': article.get('published_at', '')
            }
    
    def summarize_batch(self, articles: List[Dict[str, Any]], 
                       delay: float = 1.0,
                       max_articles: Optional[int] = None) -> List[Dict[str, Any]]:
        """
        여러 기사를 배치로 요약
        
        Args:
            articles: 기사 리스트
            delay: 요청 간 대기 시간 (초, API 제한 고려)
            max_articles: 최대 요약할 기사 수 (None이면 전체)
            
        Returns:
            요약 결과 리스트
        """
        self.stats['total_articles'] = len(articles)
        
        if max_articles:
            articles = articles[:max_articles]
        
        summaries = []
        total = len(articles)
        
        print(f"\n{'='*70}")
        print(f"📝 뉴스 요약 시작")
        print(f"총 기사 수: {total}개")
        print(f"{'='*70}\n")
        
        for i, article in enumerate(articles, 1):
            article_id = article.get('article_id', 'Unknown')
            title = article.get('title', 'No Title')
            
            print(f"[{i}/{total}] 요약 중: {article_id} - {title[:50]}...")
            
            result = self.summarize_article(article)
            summaries.append(result)
            
            if result['success']:
                print(f"  ✅ 요약 완료 (토큰: {result['tokens_used']}, 비용: ${result['cost']:.4f})")
                print(f"  📄 요약: {result['summary'][:100]}...")
            else:
                print(f"  ❌ 오류: {result['error']}")
            
            sys.stdout.flush()
            
            # API 제한 고려하여 대기
            if i < total:
                time.sleep(delay)
            
            # 진행 상황 (10개마다)
            if i % 10 == 0:
                print(f"\n📊 진행률: {i}/{total} ({i/total*100:.1f}%)")
                print(f"   성공: {self.stats['success_count']}개, 실패: {self.stats['error_count']}개")
                print(f"   총 토큰: {self.stats['total_tokens_used']}, 총 비용: ${self.stats['total_cost']:.4f}\n")
                sys.stdout.flush()
        
        # 최종 통계
        print(f"\n{'='*70}")
        print(f"✅ 요약 완료!")
        print(f"{'='*70}")
        print(f"총 기사: {total}개")
        print(f"성공: {self.stats['success_count']}개")
        print(f"실패: {self.stats['error_count']}개")
        print(f"성공률: {self.stats['success_count']/total*100:.1f}%")
        print(f"총 토큰 사용: {self.stats['total_tokens_used']}")
        print(f"총 비용: ${self.stats['total_cost']:.4f}")
        print(f"{'='*70}\n")
        
        return summaries
    
    def load_articles_from_json(self, filepath: str) -> List[Dict[str, Any]]:
        """
        JSON 파일에서 기사 로드
        
        Args:
            filepath: JSON 파일 경로
            
        Returns:
            기사 리스트
        """
        with open(filepath, 'r', encoding='utf-8') as f:
            articles = json.load(f)
        
        print(f"📂 파일 로드 완료: {filepath}")
        print(f"   기사 수: {len(articles)}개\n")
        
        return articles
    
    def save_summaries(self, summaries: List[Dict[str, Any]], 
                      output_path: str,
                      original_articles: Optional[List[Dict[str, Any]]] = None):
        """
        요약 결과 저장
        
        Args:
            summaries: 요약 결과 리스트
            output_path: 출력 파일 경로
            original_articles: 원본 기사 리스트 (함께 저장할 경우)
        """
        # 요약 결과만 저장
        if original_articles is None:
            data = {
                'summaries': summaries,
                'metadata': {
                    'total_articles': self.stats['total_articles'],
                    'success_count': self.stats['success_count'],
                    'error_count': self.stats['error_count'],
                    'total_tokens_used': self.stats['total_tokens_used'],
                    'total_cost': self.stats['total_cost'],
                    'created_at': datetime.now().isoformat()
                }
            }
        else:
            # 원본 기사와 요약 결과를 매핑하여 저장
            merged_data = []
            summary_dict = {s['article_id']: s for s in summaries}
            
            for article in original_articles:
                article_id = article.get('article_id', '')
                summary_info = summary_dict.get(article_id, {})
                
                merged_article = article.copy()
                merged_article['summary'] = summary_info.get('summary', '')
                merged_article['summary_tokens'] = summary_info.get('tokens_used', 0)
                merged_article['summary_success'] = summary_info.get('success', False)
                merged_article['summarized_at'] = summary_info.get('summarized_at', '')
                
                merged_data.append(merged_article)
            
            data = {
                'articles': merged_data,
                'metadata': {
                    'total_articles': self.stats['total_articles'],
                    'success_count': self.stats['success_count'],
                    'error_count': self.stats['error_count'],
                    'total_tokens_used': self.stats['total_tokens_used'],
                    'total_cost': self.stats['total_cost'],
                    'created_at': datetime.now().isoformat()
                }
            }
        
        # 디렉토리 생성
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # JSON 파일 저장
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"💾 요약 결과 저장 완료: {output_path}")
        print(f"   파일 크기: {os.path.getsize(output_path) / 1024:.2f} KB\n")


def main():
    """메인 실행 함수"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='OpenAI를 사용한 뉴스 기사 요약',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
사용 예시:
  # 단일 파일 요약
  python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json
  
  # 최대 10개 기사만 요약 (테스트용)
  python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --max-articles 10
  
  # 원본 기사와 함께 저장
  python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --merge-original
  
  # 출력 경로 지정
  python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --output ../DB/summaries/economy_summary.json
        """
    )
    
    parser.add_argument('--input', '-i', type=str, required=True,
                       help='입력 JSON 파일 경로')
    parser.add_argument('--output', '-o', type=str, default=None,
                       help='출력 JSON 파일 경로 (기본: ../DB/summaries/summary_[timestamp].json)')
    parser.add_argument('--max-articles', type=int, default=None,
                       help='최대 요약할 기사 수 (기본: 전체)')
    parser.add_argument('--delay', type=float, default=1.0,
                       help='요청 간 대기 시간(초) (기본: 1.0)')
    parser.add_argument('--merge-original', action='store_true',
                       help='원본 기사와 요약을 함께 저장')
    parser.add_argument('--max-tokens', type=int, default=500,
                       help='요약 최대 토큰 수 (기본: 500)')
    
    args = parser.parse_args()
    
    try:
        # Summarizer 생성
        print("🚀 뉴스 요약 시스템 시작\n")
        summarizer = NewsSummarizer()
        
        # 기사 로드
        articles = summarizer.load_articles_from_json(args.input)
        
        # 요약 실행
        summaries = summarizer.summarize_batch(
            articles,
            delay=args.delay,
            max_articles=args.max_articles
        )
        
        # 출력 경로 생성
        if args.output is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            args.output = f"../DB/summaries/summary_{timestamp}.json"
        
        # 결과 저장
        original_articles = articles if args.merge_original else None
        summarizer.save_summaries(summaries, args.output, original_articles)
        
        print("✅ 모든 작업이 완료되었습니다!")
        
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
