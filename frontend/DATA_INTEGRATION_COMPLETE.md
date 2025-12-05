# 데이터 연동 완료 가이드 ✅

## 📋 작업 완료 내용

`DB/summaries/links_summary_20251206_035026.json`의 실제 크롤링 데이터를 사용하여 **Home, ShortForm, Shorts** 페이지를 모두 연동했습니다.

---

## 🎯 데이터 구조

### 사용한 데이터
- **실제 뉴스**: 매일경제 크롤링 데이터 8개
- **광고 슬롯**: 5번째 자리 (숏글만)
- **총 개수**: 
  - 숏글: 9개 (실제 8개 + 광고 1개)
  - 숏툰: 8개 (실제 8개)
  - Home: 8개 (실제 8개, 광고 제외)

---

## 📁 파일 구조

```
frontend/
├── src/
│   ├── utils/
│   │   └── mockShortFormData.js   ✅ 실제 데이터로 업데이트
│   ├── pages/
│   │   ├── ShortForm.jsx          ✅ Mock 데이터 직접 사용
│   │   └── Shorts.jsx             ✅ Mock 데이터 직접 사용 (영상은 따로 추가 예정)
│   └── components/
│       └── NewsFeedGrid.jsx       ✅ Mock 데이터 직접 사용
```

---

## 📊 페이지별 데이터 매핑

### 1️⃣ **Home 페이지** (뉴스 피드)

**데이터 소스**: `MOCK_SHORTGEUL_DATA` (광고 제외)

**표시 개수**: 8개

**기사 목록**:
1. AI인재 처우 주요국 꼴찌수준
2. 손정의 ASI 협력논의
3. AWS 그래비톤5
4. 젠슨 황/저커버그/머스크
5. ~~[광고 - 표시 안 함]~~
6. 넷플릭스 워너브러더스 인수
7. 조진웅 소년범
8. 최태원 데이터센터 투자
9. 트럼프 국가안보전략

**코드**:
```javascript
// NewsFeedGrid.jsx
import { MOCK_SHORTGEUL_DATA } from '../utils/mockShortFormData.js';

const newsArticles = MOCK_SHORTGEUL_DATA.filter(item => !item.isAd).slice(0, 12);
```

**연동 동작**:
- Home 페이지에서 뉴스 카드 클릭
- → ShortForm 페이지로 이동하며 해당 기사 전달
- → ShortForm에서 카드뉴스 형식으로 표시

---

### 2️⃣ **ShortForm 페이지** (숏글/숏툰)

**데이터 소스**: 
- 숏글: `MOCK_SHORTGEUL_DATA` (9개)
- 숏툰: `MOCK_SHORTTOON_DATA` (8개)

#### 📝 **숏글 탭** (9개)
1. AI인재 처우
2. 손정의 ASI
3. AWS 그래비톤5
4. 젠슨 황/저커버그/머스크
5. **🎯 [광고 슬롯]** ← 여기!
6. 넷플릭스 인수
7. 조진웅 소년범
8. 최태원 데이터센터
9. 트럼프 안보전략

**데이터 구조**:
```javascript
{
  id: 'sg-11485397',
  type: 'shortgeul',
  title: '...',
  summary: '...',
  pages: [
    {
      type: 'cover',
      title: '...',
      summary: '...',
      source: '매일경제',
      publishedAt: '2025-12-05T17:21:04+09:00',
      image: 'https://...'  // ✅ 이미지 포함!
    },
    {
      type: 'content',
      content: '...',
      caption: '현황',
      image: 'https://...'  // ✅ 이미지 포함!
    }
    // 총 4개 페이지 (cover + content 3개)
  ],
  source: '매일경제',
  category: '경제',
  publishedAt: '2025-12-05T17:21:04+09:00',
  url: 'https://www.mk.co.kr/...'
}
```

#### 🎨 **숏툰 탭** (8개)
1. AI 인재 대탈출
2. 초인공지능 ASI의 시대
3. AWS 그래비톤5의 혁신
4. 테크 거물들의 AI 전쟁
5. 넷플릭스의 대형 인수
6. 충무로 스타의 과거
7. 한국 AI의 미래
8. 트럼프의 새 전략

**데이터 구조**:
```javascript
{
  id: 'st-11485397',
  type: 'shorttoon',
  title: 'AI 인재 대탈출',
  pages: [
    {
      type: 'comic',
      image: 'https://...',  // ✅ 실제 뉴스 이미지
      caption: '한국 AI 인재들이 해외로 떠나고 있다'
    }
    // 총 4개 패널
  ],
  source: '매일경제',
  category: '경제',
  publishedAt: '2025-12-05T17:21:04+09:00',
  url: 'https://www.mk.co.kr/...'
}
```

---

### 3️⃣ **Shorts 페이지** (비디오 피드)

**상태**: ⏳ 영상 파일 대기 중

**현재 동작**:
- `MOCK_VIDEO_SHORTS` 사용 (기존 Mock 데이터)
- Google 샘플 비디오 10개 표시

**영상 파일 받으면 할 일**:
```javascript
// mockVideoData.js 수정
export const MOCK_VIDEO_SHORTS = [
  {
    id: 'vs-11485397',
    title: 'AI인재 처우...',
    videoUrl: '여기에_실제_영상_URL',  // ← 교체!
    thumbnailUrl: 'https://pimg.mk.co.kr/...',
    duration: 45,
    // ...
  }
];
```

---

## 🔄 데이터 흐름

```
┌─────────────────────────────────────┐
│  DB/summaries/                       │
│  links_summary_20251206_035026.json │
│  (8개 실제 크롤링 데이터)           │
└─────────────────────────────────────┘
              │
              │ (수동 변환 완료)
              ▼
┌─────────────────────────────────────┐
│  frontend/src/utils/                 │
│  mockShortFormData.js                │
│  - MOCK_SHORTGEUL_DATA (9개)        │
│  - MOCK_SHORTTOON_DATA (8개)        │
└─────────────────────────────────────┘
              │
              ├─────────────────────────┐
              │                         │
              ▼                         ▼
┌──────────────────────┐   ┌──────────────────────┐
│   Home 페이지        │   │  ShortForm 페이지    │
│   NewsFeedGrid.jsx   │   │  ShortForm.jsx       │
│   (8개 카드 표시)    │   │  📝 숏글 / 🎨 숏툰   │
└──────────────────────┘   └──────────────────────┘
```

---

## ✅ 구현 완료 사항

### ✔️ **mockShortFormData.js**
- [x] 8개 실제 뉴스 데이터로 교체
- [x] 5번째 자리 광고 슬롯 추가
- [x] 숏글 9개 (cover + content 페이지)
- [x] 숏툰 8개 (comic 패널)
- [x] 모든 페이지에 이미지 URL 추가 ✨

### ✔️ **Home 페이지** (NewsFeedGrid.jsx)
- [x] `MOCK_SHORTGEUL_DATA` 직접 import
- [x] 광고 제외 필터링 (`filter(item => !item.isAd)`)
- [x] 실제 이미지 표시
- [x] 출처, 날짜 표시
- [x] ShortForm으로 데이터 전달

### ✔️ **ShortForm 페이지** (ShortForm.jsx)
- [x] API 제거, Mock 데이터 직접 사용
- [x] 숏글/숏툰 탭 전환 기능
- [x] Home에서 넘어온 기사 자동 변환
- [x] 광고 슬롯 포함

### ✔️ **Shorts 페이지** (Shorts.jsx)
- [x] Mock 데이터 사용 (영상 대기 중)
- [x] TOP 10 비디오 표시

---

## 🎨 주요 특징

### **이미지 연동** ✨
모든 페이지에서 실제 뉴스 이미지를 사용합니다:

```javascript
// 숏글 cover 페이지
{
  type: 'cover',
  image: 'https://pimg.mk.co.kr/...'  // ✅
}

// 숏글 content 페이지
{
  type: 'content',
  image: 'https://pimg.mk.co.kr/...'  // ✅
}

// 숏툰 comic 패널
{
  type: 'comic',
  image: 'https://pimg.mk.co.kr/...'  // ✅
}
```

### **광고 슬롯** 🎯
5번째 자리는 광고용으로 예약:

```javascript
{
  id: 'ad-slot-1',
  type: 'advertisement',
  isAd: true,  // 광고 식별 플래그
  // ...
}
```

**광고 처리 방법**:
```javascript
// ShortFormCard.jsx에서
if (article.isAd) {
  return <AdComponent />; // 광고 컴포넌트 표시
}
```

---

## 📱 사용 방법

### **실행**
```bash
cd frontend
npm run dev
```

### **페이지 확인**
1. **Home** (`http://localhost:5173/`)
   - 8개 뉴스 카드 표시
   - 클릭 → ShortForm으로 이동

2. **ShortForm** (`http://localhost:5173/shortform`)
   - 📝 탭: 숏글 9개 (광고 포함)
   - 🎨 탭: 숏툰 8개
   - 스와이프로 다음 콘텐츠

3. **Shorts** (`http://localhost:5173/shorts`)
   - TOP 10 비디오
   - ⏳ 영상 파일 받으면 교체 필요

---

## 🔧 커스터마이징 방법

### **광고 컴포넌트 만들기**

1. **컴포넌트 생성**
```bash
frontend/src/components/AdCard.jsx
```

2. **ShortFormCard.jsx 수정**
```javascript
import AdCard from './AdCard.jsx';

export default function ShortFormCard({ article, isActive }) {
  // 광고인 경우
  if (article.isAd) {
    return <AdCard />;
  }
  
  // 일반 콘텐츠
  return (
    <div className="h-screen">
      {/* 기존 코드 */}
    </div>
  );
}
```

### **영상 파일 교체**

영상을 받으시면 `mockVideoData.js` 수정:

```javascript
// frontend/src/utils/mockVideoData.js
export const MOCK_VIDEO_SHORTS = [
  {
    id: 'vs-11485397',
    videoUrl: '실제_영상_URL_또는_파일경로',  // ← 여기 교체
    thumbnailUrl: 'https://pimg.mk.co.kr/...',
    // ...
  }
];
```

### **새 뉴스 데이터 추가**

1. Backend에서 새로운 `links_summary` 생성
2. `mockShortFormData.js` 수정
3. 동일한 구조로 추가:

```javascript
{
  id: 'sg-새ID',
  type: 'shortgeul',
  title: '제목',
  summary: '요약',
  pages: [
    { type: 'cover', title, summary, source, publishedAt, image },
    { type: 'content', content, caption, image },
    // ...
  ],
  source: '매일경제',
  category: '카테고리',
  publishedAt: '날짜',
  url: 'URL'
}
```

---

## 🎯 주요 뉴스 내용

### 실제 크롤링된 8개 뉴스:

1. **AI인재 해외 유출** (경제)
   - 1만1000명 해외 이탈
   - 임금 격차 문제

2. **손정의 ASI 강조** (정치)
   - 이재명 대통령 면담
   - 초인공지능 시대 준비

3. **AWS 그래비톤5** (IT)
   - 성능 25% 향상
   - 192개 코어

4. **테크 거물 3인** (IT)
   - 젠슨 황: 원전
   - 저커버그: AI 전환
   - 머스크: 휴머노이드

5. **넷플릭스 인수** (국제)
   - 122조원 규모
   - 워너브러더스 인수

6. **조진웅 사과** (핫이슈)
   - 소년범 인정
   - 과거 사과

7. **최태원 투자 촉구** (경제)
   - 1400조원 투자
   - AI 3강 도전

8. **트럼프 안보전략** (정치)
   - 대만 방어 최우선
   - 한국 국방비 증액

---

## ⚠️ 주의사항

### **영상 파일**
- Shorts 페이지는 현재 Google 샘플 영상 사용
- 실제 영상 받으시면 `mockVideoData.js`의 `videoUrl` 교체 필요

### **광고 슬롯**
- 5번째 자리에 광고 데이터 있음
- `isAd: true` 플래그로 식별
- `ShortFormCard.jsx`에서 광고 컴포넌트로 분기 처리 필요

### **이미지 에러 처리**
```javascript
// 이미지 로드 실패 시
onError={(e) => {
  e.target.style.display = 'none';  // 숨김 처리
}}
```

---

## 🚀 다음 단계

### **즉시 가능**:
- [x] Home 페이지 뉴스 표시
- [x] ShortForm 숏글/숏툰 표시
- [x] 페이지 간 연동

### **추가 작업 필요**:
- [ ] 광고 컴포넌트 제작 및 연동
- [ ] Shorts 영상 파일 교체
- [ ] 더 많은 뉴스 데이터 추가 (현재 8개)

---

## 📞 데이터 업데이트 방법

### **새 뉴스로 교체하기**:

1. Backend에서 크롤링 실행
2. 새로운 `links_summary_XXX.json` 생성
3. `mockShortFormData.js` 업데이트
4. 동일한 구조 유지하면 자동 반영

### **카테고리별 분리** (선택사항):
```javascript
const economyNews = MOCK_SHORTGEUL_DATA.filter(item => item.category === '경제');
const politicsNews = MOCK_SHORTGEUL_DATA.filter(item => item.category === '정치');
const itNews = MOCK_SHORTGEUL_DATA.filter(item => item.category === 'IT');
```

---

## 🎉 완료!

모든 페이지가 실제 크롤링 데이터와 연동되었습니다!

- ✅ Home: 8개 뉴스 (실제 데이터)
- ✅ ShortForm 숏글: 9개 (실제 8개 + 광고 1개)
- ✅ ShortForm 숏툰: 8개 (실제 데이터)
- ⏳ Shorts: 영상 대기 중

**테스트해보세요!** 🚀
