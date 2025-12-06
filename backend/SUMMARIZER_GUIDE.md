# 뉴스 요약 시스템 (News Summarizer)

OpenAI GPT-3.5-turbo를 사용하여 크롤링된 뉴스 기사를 자동으로 요약하는 시스템입니다.

## 설치

```bash
# OpenAI 패키지 설치
pip install openai>=1.0.0

# 또는 전체 requirements 설치
pip install -r requirements.txt
```

## 환경 설정

`.env` 파일에 OpenAI API 키를 설정하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 사용 방법

### 1. 기본 사용 (전체 기사 요약)

```bash
python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json
```

### 2. 테스트용 (일부만 요약)

```bash
# 처음 10개 기사만 요약
python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --max-articles 10
```

### 3. 원본 기사와 함께 저장

```bash
python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --merge-original
```

### 4. 출력 경로 지정

```bash
python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --output ../DB/summaries/economy_summary.json
```

### 5. API 요청 속도 조절

```bash
# 요청 간 2초 대기 (API 제한 회피)
python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --delay 2.0
```

## Python 코드에서 사용

```python
from summarizer import NewsSummarizer

# Summarizer 생성
summarizer = NewsSummarizer()

# JSON 파일에서 기사 로드
articles = summarizer.load_articles_from_json('../DB/crawling/mk_news_economy_20251205_165744.json')

# 전체 기사 요약
summaries = summarizer.summarize_batch(articles, delay=1.0)

# 결과 저장
summarizer.save_summaries(
    summaries, 
    '../DB/summaries/my_summary.json',
    original_articles=articles  # 원본과 함께 저장
)
```

### 단일 기사 요약

```python
from summarizer import NewsSummarizer

summarizer = NewsSummarizer()

article = {
    'article_id': '12345',
    'title': '뉴스 제목',
    'content': '뉴스 본문 내용...'
}

result = summarizer.summarize_article(article)

if result['success']:
    print(f"요약: {result['summary']}")
    print(f"이미지: {result['image_url']}")
    print(f"카테고리: {result['category']}")
    print(f"토큰 사용: {result['tokens_used']}")
    print(f"비용: ${result['cost']:.4f}")
else:
    print(f"오류: {result['error']}")
```

## 출력 형식

### 요약만 저장 (기본)

```json
{
  "summaries": [
    {
      "success": true,
      "article_id": "11485290",
      "original_title": "동인기연, 필리핀 적십자사 '헌혈 우수 기업' 선정",
      "summary": "글로벌 아웃도어 ODM 기업 동인기연의 필리핀 생산법인 4개사가...",
      "image_url": "https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.124fde12ea6146bd991a45b8918a3be9_R.png",
      "category": "경제",
      "url": "https://www.mk.co.kr/news/economy/11485290",
      "published_at": "2025-12-05T16:09:30+09:00",
      "tokens_used": 850,
      "cost": 0.0015,
      "summarized_at": "2025-12-05T17:30:00"
    }
  ],
  "metadata": {
    "total_articles": 100,
    "success_count": 98,
    "error_count": 2,
    "total_tokens_used": 85000,
    "total_cost": 0.15,
    "created_at": "2025-12-05T17:35:00"
  }
}
```

### 원본과 함께 저장 (--merge-original)

```json
{
  "articles": [
    {
      "article_id": "11485290",
      "title": "동인기연, 필리핀 적십자사 '헌혈 우수 기업' 선정",
      "content": "원본 기사 전체 내용...",
      "category": "경제",
      "published_at": "2025-12-05T16:09:30+09:00",
      "summary": "글로벌 아웃도어 ODM 기업 동인기연의 필리핀 생산법인 4개사가...",
      "summary_tokens": 850,
      "summary_success": true,
      "summarized_at": "2025-12-05T17:30:00"
    }
  ],
  "metadata": {
    "total_articles": 100,
    "success_count": 98,
    "error_count": 2,
    "total_tokens_used": 85000,
    "total_cost": 0.15,
    "created_at": "2025-12-05T17:35:00"
  }
}
```

## 요약 특징

- **5-6줄 짧은 요약**: 핵심만 간결하게
- **짧은 어투**: 명사형 종결, 체언 종지 활용
- **키워드 중심**: 핵심 키워드와 주요 수치 포함
- **팩트 중심**: 객관적이고 사실만 정리
- **불필요한 수식어 최소화**: 간결하고 명확하게

## 비용 정보

- **모델**: GPT-3.5-turbo
- **Input**: $0.0015 / 1K tokens
- **Output**: $0.002 / 1K tokens
- **평균 비용**: 기사당 약 $0.002-0.005

예상 비용:
- 100개 기사 요약: 약 $0.20-0.50
- 1000개 기사 요약: 약 $2.00-5.00

## API 제한 고려사항

- **RPM (Requests Per Minute)**: 분당 요청 수 제한
- **TPM (Tokens Per Minute)**: 분당 토큰 수 제한
- **권장 설정**: `--delay 1.0` (초당 1개 요청)

무료 계정의 경우 더 긴 delay를 사용하세요:
```bash
python summarizer.py --input file.json --delay 2.0
```

## 에러 처리

- **API 키 없음**: `.env` 파일에 `OPENAI_API_KEY` 설정 확인
- **요청 제한 초과**: `--delay` 값을 높이세요
- **본문 없음**: 본문이 100자 미만인 기사는 자동으로 스킵됩니다

## 배치 처리 예시

모든 카테고리 요약:

```bash
# 경제
python summarizer.py --input ../DB/crawling/mk_news_economy_20251205_165744.json --output ../DB/summaries/economy_summary.json

# 정치
python summarizer.py --input ../DB/crawling/mk_news_politics_20251205_170447.json --output ../DB/summaries/politics_summary.json

# IT
python summarizer.py --input ../DB/crawling/mk_news_it_20251205_171909.json --output ../DB/summaries/it_summary.json
```

## 통계 확인

요약 실행 중에 다음 통계가 표시됩니다:

- 총 기사 수
- 성공/실패 건수
- 총 토큰 사용량
- 총 비용 (USD)
- 진행률

## 주의사항

1. **API 키 보안**: `.env` 파일을 git에 커밋하지 마세요
2. **비용 관리**: 대량 요약 전 소량 테스트 권장
3. **본문 길이**: 8000자 이상은 자동으로 잘립니다
4. **요청 제한**: OpenAI API 플랜에 따라 조절하세요

