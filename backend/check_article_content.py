"""article_id가 같은 기사들의 내용이 실제로 같은지 확인"""
import json
import sys
from pathlib import Path
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

files = list(Path('crawled_data').glob('mk_news_*.json'))
print(f"📁 총 {len(files)}개 JSON 파일 분석\n")
sys.stdout.flush()

# article_id별로 기사들을 그룹화
articles_by_id = defaultdict(list)

for f in files:
    articles = json.load(open(f, 'r', encoding='utf-8'))
    for article in articles:
        article_id = article.get('article_id')
        if article_id:
            articles_by_id[article_id].append({
                'file': f.name,
                'category': article.get('category', 'Unknown'),
                'title': article.get('title', ''),
                'content': article.get('content', ''),
                'url': article.get('url', ''),
                'article_id': article_id
            })

# 중복된 article_id 찾기
duplicates = {k: v for k, v in articles_by_id.items() if len(v) > 1}

print(f"📊 총 고유 article_id: {len(articles_by_id)}개")
print(f"📊 중복된 article_id: {len(duplicates)}개\n")

if duplicates:
    print("=" * 80)
    print("중복된 article_id 상세 분석")
    print("=" * 80)
    
    # 내용이 다른 경우 찾기
    different_content_count = 0
    same_content_count = 0
    
    for article_id, articles in list(duplicates.items())[:10]:  # 처음 10개만 상세 분석
        print(f"\n🔍 Article ID: {article_id}")
        print(f"   발견된 횟수: {len(articles)}회")
        
        # 첫 번째 기사를 기준으로 비교
        base_article = articles[0]
        base_title = base_article['title'].strip()
        base_content = base_article['content'].strip()[:200]  # 앞 200자만 비교
        
        all_same = True
        
        for i, article in enumerate(articles):
            title = article['title'].strip()
            content = article['content'].strip()[:200]
            
            print(f"\n   [{i+1}] 파일: {article['file']}")
            print(f"       카테고리: {article['category']}")
            print(f"       제목: {title[:50]}...")
            
            # 제목이나 내용이 다르면
            if title != base_title or content != base_content:
                all_same = False
                print(f"       ⚠️  내용이 다릅니다!")
                if title != base_title:
                    print(f"          - 제목이 다름")
                if content != base_content:
                    print(f"          - 본문이 다름")
        
        if all_same:
            same_content_count += 1
            print(f"\n   ✅ 모든 기사가 동일한 내용입니다.")
        else:
            different_content_count += 1
            print(f"\n   ❌ 내용이 다른 기사가 있습니다!")
    
    print("\n" + "=" * 80)
    print("전체 통계")
    print("=" * 80)
    
    # 전체 중복에 대해 빠른 체크
    total_different = 0
    total_same = 0
    
    for article_id, articles in duplicates.items():
        base_title = articles[0]['title'].strip()
        base_content = articles[0]['content'].strip()[:100]  # 빠른 비교를 위해 100자만
        
        all_same = True
        for article in articles[1:]:
            if (article['title'].strip() != base_title or 
                article['content'].strip()[:100] != base_content):
                all_same = False
                break
        
        if all_same:
            total_same += 1
        else:
            total_different += 1
    
    print(f"\n📊 전체 중복 기사 분석:")
    print(f"   내용이 동일한 중복: {total_same}개")
    print(f"   내용이 다른 중복: {total_different}개")
    
    if total_different > 0:
        print(f"\n⚠️  주의: {total_different}개의 article_id가 서로 다른 내용을 가지고 있습니다!")
        print(f"   현재 중복 제거 로직은 article_id만으로 판단하므로,")
        print(f"   내용이 다른 기사가 제거될 수 있습니다.")
else:
    print("✅ 중복된 article_id가 없습니다.")

# 결과를 파일로도 저장
with open('article_content_check_result.txt', 'w', encoding='utf-8') as f:
    f.write(f"총 고유 article_id: {len(articles_by_id)}개\n")
    f.write(f"중복된 article_id: {len(duplicates)}개\n")
    f.write(f"내용이 동일한 중복: {total_same}개\n")
    f.write(f"내용이 다른 중복: {total_different}개\n")
    
    if total_different > 0:
        f.write("\n⚠️  주의: 내용이 다른 중복 기사가 있습니다!\n")

print("\n✅ 결과가 article_content_check_result.txt 파일에 저장되었습니다.")
