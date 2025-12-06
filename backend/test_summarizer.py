"""
Summarizer 테스트 스크립트
소량의 기사로 빠르게 테스트
"""

from summarizer import NewsSummarizer
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')


def test_summarizer():
    """Summarizer 기능 테스트"""
    
    print("=" * 70)
    print("뉴스 요약 시스템 테스트")
    print("=" * 70)
    print()
    
    try:
        # Summarizer 생성
        print("1. Summarizer 초기화 중...")
        summarizer = NewsSummarizer()
        print("   ✅ 초기화 완료\n")
        
        # 샘플 기사 로드 (경제 카테고리 처음 3개만)
        print("2. 테스트 기사 로드 중...")
        input_file = '../DB/crawling/mk_news_economy_20251205_165744.json'
        articles = summarizer.load_articles_from_json(input_file)
        
        # 처음 3개만 테스트
        test_articles = articles[:3]
        print(f"   ✅ 테스트 기사 수: {len(test_articles)}개\n")
        
        # 요약 실행
        print("3. 요약 실행 중...\n")
        summaries = summarizer.summarize_batch(test_articles, delay=1.0)
        
        # 결과 출력
        print("\n" + "=" * 70)
        print("요약 결과 상세")
        print("=" * 70)
        
        for i, summary in enumerate(summaries, 1):
            print(f"\n[기사 {i}]")
            print(f"ID: {summary.get('article_id', 'N/A')}")
            print(f"제목: {summary.get('original_title', 'N/A')[:60]}...")
            
            if summary.get('success'):
                print(f"카테고리: {summary.get('category', 'N/A')}")
                print(f"발행일: {summary.get('published_at', 'N/A')}")
                print(f"이미지: {summary.get('image_url', 'N/A')[:60]}...")
                print(f"\n📝 요약:")
                print(f"   {summary.get('summary', 'N/A')}")
                print(f"\n💰 비용: ${summary.get('cost', 0):.4f}")
                print(f"🔢 토큰: {summary.get('tokens_used', 0)}")
            else:
                print(f"❌ 오류: {summary.get('error', 'N/A')}")
            
            print("-" * 70)
        
        # 결과 저장 (테스트용)
        print("\n4. 결과 저장 중...")
        output_file = '../DB/summaries/test_summary.json'
        summarizer.save_summaries(summaries, output_file, original_articles=test_articles)
        print(f"   ✅ 저장 완료: {output_file}\n")
        
        # 통계
        print("=" * 70)
        print("테스트 통계")
        print("=" * 70)
        print(f"총 기사: {len(test_articles)}개")
        print(f"성공: {summarizer.stats['success_count']}개")
        print(f"실패: {summarizer.stats['error_count']}개")
        print(f"총 토큰: {summarizer.stats['total_tokens_used']}")
        print(f"총 비용: ${summarizer.stats['total_cost']:.4f}")
        print("=" * 70)
        
        print("\n✅ 테스트 완료!")
        print(f"\n💡 팁: 전체 기사를 요약하려면:")
        print(f"   python summarizer.py --input {input_file} --merge-original\n")
        
    except FileNotFoundError:
        print("❌ 오류: 입력 파일을 찾을 수 없습니다.")
        print("   크롤링된 데이터가 ../DB/crawling/ 폴더에 있는지 확인하세요.\n")
    except ValueError as e:
        print(f"❌ 오류: {e}")
        print("   .env 파일에 OPENAI_API_KEY가 설정되어 있는지 확인하세요.\n")
    except Exception as e:
        print(f"❌ 오류: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    test_summarizer()

