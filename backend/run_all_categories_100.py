"""
모든 카테고리 100개씩 순차적으로 크롤링
"""

import sys
import time
from mk_crawler import MKCrawler, DataStorage, MK_CATEGORIES

sys.stdout.reconfigure(encoding='utf-8')

# 각 카테고리별 시작 번호 (경제는 이미 완료했으므로 제외)
CATEGORY_START_NUMBERS = {
    "politics": 11485092,
    "society": 11485210,
    "world": 11484944,
    "business": 11484960,
    "stock": 11484948,
    "realestate": 11484763,
    "it": 11485017,
    "culture": 11484509,
    "sports": 11484539
}

def main():
    print("=" * 70)
    print("모든 카테고리 순차 크롤링 시작")
    print("각 카테고리당 100개씩 수집")
    print("=" * 70)
    print()
    
    crawler = MKCrawler(delay=0.2)
    storage = DataStorage(output_dir="crawled_data")
    
    # 경제는 이미 완료했으므로 제외
    categories_to_crawl = [
        ("politics", "정치"),
        ("society", "사회"),
        ("world", "국제"),
        ("business", "기업"),
        ("stock", "증권"),
        ("realestate", "부동산"),
        ("it", "IT"),
        ("culture", "문화"),
        ("sports", "스포츠")
    ]
    
    all_results = {}
    
    for category_slug, category_name in categories_to_crawl:
        if category_slug not in CATEGORY_START_NUMBERS:
            print(f"⚠️  {category_name} ({category_slug})의 시작 번호가 없습니다. 스킵합니다.")
            continue
        
        start_number = CATEGORY_START_NUMBERS[category_slug]
        
        print(f"\n{'='*70}")
        print(f"카테고리: {category_name} ({category_slug})")
        print(f"시작 번호: {start_number}")
        print(f"{'='*70}\n")
        sys.stdout.flush()
        
        try:
            articles = crawler.crawl_by_number_range(
                category=category_slug,
                start_number=start_number,
                max_articles=100
            )
            
            all_results[category_slug] = len(articles)
            
            # 결과 저장
            if articles:
                from datetime import datetime
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                
                json_file = storage.save_to_json(
                    articles,
                    f"mk_news_{category_slug}_{timestamp}.json"
                )
                csv_file = storage.save_to_csv(
                    articles,
                    f"mk_news_{category_slug}_{timestamp}.csv"
                )
                
                print(f"\n📁 저장 완료:")
                print(f"  JSON: {json_file}")
                print(f"  CSV: {csv_file}")
                sys.stdout.flush()
            
            # 카테고리 간 대기 (5초)
            if category_slug != categories_to_crawl[-1][0]:
                print(f"\n다음 카테고리로 이동하기 전 5초 대기...")
                sys.stdout.flush()
                time.sleep(5)
                
        except KeyboardInterrupt:
            print(f"\n\n⚠️  사용자에 의해 중단되었습니다.")
            break
        except Exception as e:
            print(f"\n❌ {category_name} ({category_slug}) 카테고리 오류: {e}")
            import traceback
            traceback.print_exc()
            all_results[category_slug] = 0
            continue
    
    # 전체 결과 요약
    print("\n" + "=" * 70)
    print("전체 결과 요약")
    print("=" * 70)
    total_articles = sum(all_results.values())
    for cat_slug, cat_name in categories_to_crawl:
        count = all_results.get(cat_slug, 0)
        print(f"  {cat_name:10s} ({cat_slug:15s}): {count:4d}개")
    print(f"{'='*70}")
    print(f"  총계: {total_articles:4d}개")
    print("=" * 70)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  사용자에 의해 중단되었습니다.")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
