"""
추천 시스템 테스트 스크립트
명령줄에서 추천 시스템을 테스트할 수 있습니다
"""

import sys
import argparse
from recommender import ArticleRecommender
import json

def print_recommendations(recommender, article_id, top_n=5, category=None, min_similarity=0.3):
    """추천 결과 출력"""
    print("\n" + "="*80)
    print(f"기사 추천 테스트")
    print("="*80)
    
    # 기준 기사 정보
    base_article = recommender.get_article_info(article_id)
    if not base_article:
        print(f"❌ 기사를 찾을 수 없습니다: {article_id}")
        return
    
    print(f"\n📰 기준 기사:")
    print(f"   ID: {base_article.get('article_id')}")
    print(f"   제목: {base_article.get('title')}")
    print(f"   카테고리: {base_article.get('category')}")
    print(f"   URL: {base_article.get('url')}")
    
    # 추천 수행
    if category:
        print(f"\n🔍 '{category}' 카테고리 내에서 추천 중...")
        recommendations = recommender.recommend_by_category(
            article_id=article_id,
            category=category,
            top_n=top_n,
            min_similarity=min_similarity
        )
    else:
        print(f"\n🔍 전체 기사 중에서 추천 중...")
        recommendations = recommender.recommend(
            article_id=article_id,
            top_n=top_n,
            min_similarity=min_similarity
        )
    
    if not recommendations:
        print(f"\n⚠️  추천할 기사를 찾을 수 없습니다.")
        print(f"   (최소 유사도: {min_similarity})")
        return
    
    print(f"\n✅ 추천 기사 {len(recommendations)}개:\n")
    
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. [{rec['category']}] {rec['title']}")
        if rec.get('subtitle'):
            print(f"   부제: {rec['subtitle']}")
        print(f"   유사도: {rec['similarity']:.4f} ({rec['similarity']*100:.1f}%)")
        print(f"   발행일: {rec['published_at']}")
        print(f"   URL: {rec['url']}")
        print(f"   ID: {rec['article_id']}")
        print()

def list_articles(recommender, limit=10, category=None):
    """기사 목록 출력"""
    print("\n" + "="*80)
    print("기사 목록")
    print("="*80 + "\n")
    
    articles = recommender.articles
    if category:
        articles = [a for a in articles if a.get('category') == category]
        print(f"카테고리 필터: {category}\n")
    
    print(f"총 {len(articles)}개 기사\n")
    
    for i, article in enumerate(articles[:limit], 1):
        print(f"{i}. [{article.get('category')}] {article.get('title')[:60]}...")
        print(f"   ID: {article.get('article_id')} | 발행일: {article.get('published_at')}")
        print()

def main():
    parser = argparse.ArgumentParser(description='기사 추천 시스템 테스트')
    parser.add_argument('command', choices=['recommend', 'list', 'info'], 
                       help='명령어: recommend(추천), list(목록), info(정보)')
    parser.add_argument('--article-id', '-a', type=str, 
                       help='기사 ID (recommend, info 명령어에서 사용)')
    parser.add_argument('--top-n', '-n', type=int, default=5,
                       help='추천할 기사 개수 (기본값: 5)')
    parser.add_argument('--category', '-c', type=str,
                       help='카테고리 필터')
    parser.add_argument('--min-similarity', '-s', type=float, default=0.3,
                       help='최소 유사도 임계값 (기본값: 0.3)')
    parser.add_argument('--limit', '-l', type=int, default=10,
                       help='목록 출력 개수 (기본값: 10)')
    
    args = parser.parse_args()
    
    try:
        # 추천 시스템 초기화
        print("📚 추천 시스템 초기화 중...")
        recommender = ArticleRecommender()
        print(f"✅ {len(recommender.articles)}개 기사 로드 완료\n")
        
        if args.command == 'recommend':
            if not args.article_id:
                print("❌ 추천 명령어는 --article-id가 필요합니다.")
                print("\n사용 예시:")
                print("  python test_recommender.py recommend --article-id 11485290")
                sys.exit(1)
            
            print_recommendations(
                recommender=recommender,
                article_id=args.article_id,
                top_n=args.top_n,
                category=args.category,
                min_similarity=args.min_similarity
            )
        
        elif args.command == 'list':
            list_articles(
                recommender=recommender,
                limit=args.limit,
                category=args.category
            )
        
        elif args.command == 'info':
            if not args.article_id:
                print("❌ info 명령어는 --article-id가 필요합니다.")
                sys.exit(1)
            
            article = recommender.get_article_info(args.article_id)
            if article:
                print("\n" + "="*80)
                print("기사 정보")
                print("="*80 + "\n")
                print(json.dumps(article, ensure_ascii=False, indent=2))
            else:
                print(f"❌ 기사를 찾을 수 없습니다: {args.article_id}")
    
    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    # 인자가 없으면 도움말 표시
    if len(sys.argv) == 1:
        print("""
기사 추천 시스템 테스트 도구

사용법:
  1. 기사 추천:
     python test_recommender.py recommend --article-id <기사ID>
     
  2. 기사 목록 보기:
     python test_recommender.py list [--limit 10] [--category 경제]
     
  3. 기사 정보 보기:
     python test_recommender.py info --article-id <기사ID>

옵션:
  --article-id, -a    기사 ID
  --top-n, -n         추천 개수 (기본값: 5)
  --category, -c      카테고리 필터
  --min-similarity, -s  최소 유사도 (기본값: 0.3)
  --limit, -l         목록 출력 개수 (기본값: 10)

예시:
  # 첫 번째 기사로 추천 테스트
  python test_recommender.py list --limit 1
  python test_recommender.py recommend --article-id 11485290
  
  # 경제 카테고리 내에서 추천
  python test_recommender.py recommend --article-id 11485290 --category 경제
  
  # 유사도 0.5 이상만 추천
  python test_recommender.py recommend --article-id 11485290 --min-similarity 0.5
        """)
        sys.exit(0)
    
    main()
