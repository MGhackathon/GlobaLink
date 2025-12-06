"""
URL 크롤링 기사 요약 스크립트
"""
import sys
from summarizer import NewsSummarizer
from datetime import datetime

def main():
    print("=" * 70)
    print("URL 크롤링 기사 요약 시작")
    print("=" * 70)
    print()
    
    # 입력 파일
    input_file = "../DB/crawling/mk_news_links_20251206_034722.json"
    
    try:
        # Summarizer 생성
        print("🚀 Summarizer 초기화 중...\n")
        summarizer = NewsSummarizer()
        
        # 기사 로드
        articles = summarizer.load_articles_from_json(input_file)
        
        # 요약 실행 (8개 기사, 1.5초 딜레이)
        summaries = summarizer.summarize_batch(
            articles,
            delay=1.5
        )
        
        # 출력 경로 생성
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = f"../DB/summaries/links_summary_{timestamp}.json"
        
        # 결과 저장 (원본과 함께)
        summarizer.save_summaries(summaries, output_file, articles)
        
        print("\n✅ 모든 작업이 완료되었습니다!")
        print(f"📁 저장 위치: {output_file}")
        
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

