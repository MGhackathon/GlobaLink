# 백엔드 연동 가이드 (Backend Integration Guide)

이 문서는 프론트엔드의 세 가지 주요 페이지(Home, ShortForm, Shorts)의 데이터 구조와 백엔드 API 연동 방법을 설명합니다.

---

## 📋 목차

1. [전체 구조 개요](#전체-구조-개요)
2. [Home 페이지 (뉴스 피드)](#1-home-페이지-뉴스-피드)
3. [ShortForm 페이지 (숏글/숏툰)](#2-shortform-페이지-숏글숏툰)
4. [Shorts 페이지 (비디오 피드)](#3-shorts-페이지-비디오-피드)
5. [백엔드 API 연동 방법](#백엔드-api-연동-방법)
6. [필요한 API 엔드포인트](#필요한-api-엔드포인트)

---

## 전체 구조 개요

```
┌─────────────────────────────────────────────────────────────┐
│                      GlobaLink Frontend                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Home (피드)  │  │  ShortForm   │  │    Shorts    │      │
│  │              │  │  (숏글/숏툰) │  │  (비디오)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         │ Mock 데이터      │ Mock 데이터      │ Mock 데이터  │
│         ▼                  ▼                  ▼              │
│  NewsFeedGrid.jsx   mockShortForm     mockVideoData.js      │
│  (하드코딩 12개)    Data.js           (10개 비디오)        │
│                     (통합 구조:                             │
│                      10개 항목,                              │
│                      각각 숏글+숏툰)                         │
│                                                               │
│  ⚠️ 현재 모두 Mock 데이터 사용 중 (DB 연동 필요)           │
│                                                               │
│  📌 ShortForm: 탭 간 실시간 인덱스 공유 (currentIndex)      │
│  📌 Shorts: TikTok 스타일 비디오 플레이어 (자동 재생/정지)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Home 페이지 (뉴스 피드)

### 📂 관련 파일
- **컴포넌트**: `src/components/NewsFeedGrid.jsx`
- **데이터 소스**: 현재 하드코딩 (컴포넌트 내부)
- **참조용 API**: `src/api/newsAPI.js` (현재 미사용)

### 📊 현재 데이터 구조

**`NewsFeedGrid.jsx:6-10`** - Mock 데이터 생성 부분:
```javascript
const mockCards = Array.from({ length: 12 }, (_, i) => ({
	id: i + 1,
	title: `뉴스 ${i + 1}`
}));
```

**문제점**:
- 제목만 있고 실제 뉴스 내용이 없음
- 이미지, 출처, 날짜, 본문 등 모든 데이터 누락

### 🎯 필요한 데이터 구조

```typescript
// 백엔드가 제공해야 할 Article 객체
interface Article {
	id: number | string;           // 고유 ID
	title: string;                  // 뉴스 제목
	description?: string;           // 뉴스 요약 (선택)
	content?: string;               // 전체 본문 (선택)
	urlToImage?: string;            // 썸네일 이미지 URL
	source: {                       // 출처 정보
		name: string;               // 예: "CNN", "BBC"
	};
	publishedAt: string;            // 발행 날짜 (ISO 8601 형식)
	url?: string;                   // 원본 기사 URL
	author?: string;                // 작성자 (선택)
	category?: string;              // 카테고리 (선택)
}
```

### 🔧 백엔드 연동 방법

#### 방법 1: 기존 newsAPI.js 활용 (추천)

`src/api/newsAPI.js`는 이미 NewsAPI.org와 연동되어 있습니다. 자체 백엔드 API를 만들려면 이 파일을 수정하세요.

**수정 전 (NewsAPI.org 사용)**:
```javascript
// src/api/newsAPI.js:19-56
export async function fetchNews({ countryCode = 'US', category = null } = {}) {
	// NewsAPI.org 호출...
}
```

**수정 후 (자체 백엔드 사용)**:
```javascript
// src/api/newsAPI.js
const BACKEND_URL = 'http://localhost:5000'; // 백엔드 URL

export async function fetchNews({ countryCode = 'US', category = null, limit = 12 } = {}) {
	try {
		// 쿼리 파라미터 구성
		const params = new URLSearchParams({
			country: countryCode,
			limit: limit.toString()
		});
		if (category) params.append('category', category);

		const response = await fetch(`${BACKEND_URL}/api/news?${params}`);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data = await response.json();
		return data.articles || [];
	} catch (error) {
		console.error('뉴스 API 오류:', error);
		return [];
	}
}
```

#### 방법 2: NewsFeedGrid 컴포넌트 직접 수정

**`src/components/NewsFeedGrid.jsx` 수정**:

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../api/newsAPI.js'; // 추가

export default function NewsFeedGrid({ onToggleView }) {
	const navigate = useNavigate();
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);

	// 컴포넌트 마운트 시 뉴스 로드
	useEffect(() => {
		const loadNews = async () => {
			setLoading(true);
			const data = await fetchNews({ countryCode: 'US', limit: 12 });
			setArticles(data);
			setLoading(false);
		};
		loadNews();
	}, []);

	if (loading) {
		return <div>로딩 중...</div>;
	}

	return (
		<div className="mb-6 sm:mb-10">
			{/* ... 헤더 ... */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
				{articles.map((article) => (
					<article
						key={article.id}
						onClick={() => navigate('/shortform', { state: { article } })}
						className="..."
					>
						{/* 이미지 */}
						<div className="relative h-48 bg-gray-100">
							{article.urlToImage ? (
								<img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover" />
							) : (
								<div className="flex items-center justify-center h-full">
									<svg className="w-16 h-16 text-gray-400" />
								</div>
							)}
						</div>

						<div className="p-6 flex-1 flex flex-col">
							<div className="flex items-center justify-between text-xs text-gray-500 mb-4">
								<span>{article.source.name}</span>
								<span>{new Date(article.publishedAt).toLocaleDateString()}</span>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-auto line-clamp-3">
								{article.title}
							</h3>
							{/* ... 버튼들 ... */}
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
```

---

## 2. ShortForm 페이지 (숏글/숏툰)

### 📂 관련 파일
- **페이지**: `src/pages/ShortForm.jsx`
- **Mock 데이터**: `src/utils/mockShortFormData.js`
- **컴포넌트**: `src/components/ShortFormCard.jsx`

### 📊 현재 데이터 구조

**⚠️ 중요: 통합 데이터 구조 사용**

숏글(Shortgeul)과 숏툰(Shorttoon)은 **하나의 뉴스 콘텐츠를 대상으로 1:1 매핑**되어야 합니다. 백엔드는 각 뉴스에 대해 두 가지 형식을 모두 제공해야 합니다.

**두 가지 타입의 콘텐츠**:
1. **숏글 (Shortgeul)**: 카드 뉴스 형식 (3-4페이지)
2. **숏툰 (Shorttoon)**: 만화 형식 (4-6 패널)

**`mockShortFormData.js:3-31`** - 통합 데이터 구조 예시:
```javascript
export const MOCK_SHORTFORM_DATA = [
	{
		id: 'sf-1',
		newsId: 'news-1',  // 뉴스 고유 ID
		shortgeul: {
			id: 'sg-1',
			type: 'shortgeul',
			title: 'AI 기술, 의료 분야 혁신 주도',
			summary: '...',
			pages: [
				{
					type: 'cover',
					title: '...',
					summary: '...',
					source: 'TechHealth Daily',
					publishedAt: '3시간 전'
				},
				{
					type: 'content',
					content: '페이지 내용...',
					caption: '주요 포인트 1'
				}
				// 3-4개 페이지
			]
		},
		shorttoon: {
			id: 'st-1',
			type: 'shorttoon',
			title: 'AI 기술, 의료 분야 혁신 주도',  // 같은 제목
			pages: [
				{
					type: 'comic',
					image: 'https://example.com/panel1.jpg',  // 실제 이미지 URL
					caption: '2025년, AI가 일상이 된 세상'
				}
				// 4-6개 패널
			]
		},
		source: 'TechHealth Daily',
		publishedAt: '3시간 전',
		url: 'https://example.com/ai-healthcare'
	}
	// ... 9개 더 (총 10개)
];
```

**중요**: 각 항목은 `shortgeul`과 `shorttoon` 속성을 모두 포함해야 하며, 개수는 항상 동일해야 합니다.

### 🎯 필요한 데이터 구조

```typescript
// 통합 ShortForm 콘텐츠 (백엔드가 제공해야 할 형식)
interface ShortFormContent {
	id: string;                   // ShortForm 항목 고유 ID
	newsId: string;               // 원본 뉴스 고유 ID
	shortgeul: {                  // 카드 뉴스 형식
		id: string;
		type: 'shortgeul';
		title: string;
		summary: string;
		pages: Array<{
			type: 'cover' | 'content';
			title?: string;           // cover 페이지만
			summary?: string;         // cover 페이지만
			content?: string;         // content 페이지만
			caption?: string;         // content 페이지만
			source?: string;          // cover 페이지만
			publishedAt?: string;     // cover 페이지만
		}>;
	};
	shorttoon: {                  // 만화 형식
		id: string;
		type: 'shorttoon';
		title: string;
		pages: Array<{
			type: 'comic';
			image: string;            // 이미지 URL (필수!)
			caption: string;
		}>;
	};
	source: string;
	publishedAt: string;
	url?: string;                 // 원본 뉴스 URL
}
```

**중요 사항**:
- 백엔드는 하나의 뉴스에 대해 `shortgeul`과 `shorttoon` 두 가지 형식을 모두 제공해야 합니다
- `newsId`를 통해 같은 뉴스의 다른 형식임을 식별할 수 있습니다
- 개수는 항상 동일해야 합니다 (예: 10개 뉴스 = 10개 숏글 = 10개 숏툰)

### 🔧 백엔드 연동 방법

**중요**: ShortForm 페이지는 탭 간 실시간 인덱스 공유를 구현합니다. 사용자가 숏글 8번째를 보다가 숏툰 탭을 누르면 8번째 숏툰이 표시되며, 다시 숏글로 돌아와도 8번째 위치를 유지합니다.

**`src/pages/ShortForm.jsx` 백엔드 연동 예시**:

```javascript
import { MOCK_SHORTFORM_DATA, convertToShortForm } from '../utils/mockShortFormData.js';

// 백엔드 API 추가
const BACKEND_URL = 'http://localhost:5000';

async function fetchShortFormContent() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/shortform`);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		return data.content || [];  // ShortFormContent[] 배열
	} catch (error) {
		console.error('ShortForm API 오류:', error);
		// Fallback to mock data
		return MOCK_SHORTFORM_DATA;
	}
}

export default function ShortForm() {
	const [activeTab, setActiveTab] = useState('shortgeul');
	const [currentIndex, setCurrentIndex] = useState(0);  // 공유 인덱스
	const [articles, setArticles] = useState([]);
	const containerRef = useRef(null);
	const location = useLocation();

	// 초기 데이터 로드 (NewsFeedGrid에서 넘어온 article 포함)
	useEffect(() => {
		const loadContent = async () => {
			const initialArticle = location.state?.article;
			const data = await fetchShortFormContent();  // 통합 데이터 가져오기

			// Mock 데이터에서 현재 탭에 맞는 형식만 추출
			const formattedData = data.map(item =>
				activeTab === 'shortgeul' ? item.shortgeul : item.shorttoon
			);

			if (initialArticle && activeTab === 'shortgeul') {
				// NewsFeedGrid에서 넘어온 기사를 ShortForm 형식으로 변환하여 맨 앞에 추가
				const convertedArticle = convertToShortForm(initialArticle);
				setArticles([convertedArticle, ...formattedData]);
			} else {
				// 탭 전환 시에는 데이터만 로드
				setArticles(formattedData);
			}

			// 탭 전환 시 현재 인덱스로 스크롤 (인덱스 공유)
			if (containerRef.current) {
				// 경계 체크
				const safeIndex = Math.min(currentIndex, formattedData.length - 1);
				const scrollTop = safeIndex * window.innerHeight;

				// 부드러운 스크롤 대신 즉시 이동
				containerRef.current.scrollTop = scrollTop;
			}
		};
		loadContent();
	}, [activeTab, currentIndex]);

	// 스크롤 이벤트로 현재 인덱스 추적 (공유 인덱스)
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const scrollTop = container.scrollTop;
			const itemHeight = window.innerHeight;
			const newIndex = Math.round(scrollTop / itemHeight);

			// 공유 인덱스 업데이트 (모든 탭에서 동일한 인덱스 사용)
			setCurrentIndex(newIndex);
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	// ... 나머지 코드
}
```

**핵심 로직**:
- `fetchShortFormContent()`: 통합 데이터 배열 가져오기 (각 항목에 shortgeul과 shorttoon 모두 포함)
- `currentIndex`: 탭 간 공유되는 단일 인덱스 (실시간 동기화)
- `formattedData`: 현재 탭에 맞는 형식(shortgeul 또는 shorttoon)만 추출
- 탭 전환 시 `currentIndex`로 스크롤 위치 유지

---

## 3. Shorts 페이지 (비디오 피드)

### 📂 관련 파일
- **페이지**: `src/pages/Shorts.jsx`
- **Mock 데이터**: `src/utils/mockVideoData.js`
- **컴포넌트**: `src/components/VideoShortCard.jsx`
- **헤더**: `src/components/DateHeader.jsx`

### 📊 현재 데이터 구조

**`mockVideoData.js:4-14`** - 비디오 객체 예시:
```javascript
{
	id: 'vs-1',
	title: 'AI 기술의 새로운 혁신: GPT-5 발표 임박',
	videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
	thumbnailUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
	source: 'TechNews',
	publishedAt: '3시간 전',
	duration: 45,  // 초 단위
	url: 'https://example.com/ai-gpt5-announcement'
}
```

**특징**:
- **TOP 10 제한**: 정확히 10개의 비디오만 표시
- **동적 헤더**: "12월 6일의 TOP 10" (현재 날짜 자동 표시)
- **비디오 형식**: mp4, webm 등 HTML5 video 지원 형식

### 🎯 필요한 데이터 구조

```typescript
interface VideoShort {
	id: string;
	title: string;
	videoUrl: string;        // 필수! 실제 비디오 파일 URL
	thumbnailUrl: string;    // 필수! 비디오 썸네일 이미지 URL
	source: string;          // 출처 (예: "TechNews", "Bloomberg")
	publishedAt: string;     // 발행 시간 (예: "3시간 전")
	duration: number;        // 비디오 길이 (초 단위)
	url: string;             // 원본 기사/비디오 URL
}

interface VideoShortsResponse {
	date: string;            // 날짜 (예: "2025-12-06")
	videos: VideoShort[];    // 정확히 10개
}
```

### 🔧 백엔드 연동 방법

**`src/pages/Shorts.jsx:14-29` 수정**:

```javascript
import { MOCK_VIDEO_SHORTS } from '../utils/mockVideoData.js';

// 백엔드 API 추가
const BACKEND_URL = 'http://localhost:5000';

async function fetchVideoShorts() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/shorts/top10`);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		return data.videos || [];
	} catch (error) {
		console.error('Shorts API 오류:', error);
		// Fallback to mock data
		return MOCK_VIDEO_SHORTS;
	}
}

export default function Shorts() {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadVideos = async () => {
			setLoading(true);
			const data = await fetchVideoShorts();
			setVideos(data.slice(0, 10)); // TOP 10만 가져오기
			setLoading(false);
		};
		loadVideos();
	}, []);

	// ... 나머지 코드
}
```

---

## 백엔드 API 연동 방법

### 📁 API 클라이언트 파일 구조

```
src/api/
├── newsAPI.js          # 뉴스 기사 API
├── backendAPI.js       # 기존 Flask 백엔드 API (번역, 요약 등)
└── translateAPI.js     # 번역 유틸리티
```

### 🔄 통합 API 클라이언트 생성 (추천)

새로운 파일 `src/api/contentAPI.js` 생성:

```javascript
// src/api/contentAPI.js
const BACKEND_URL = 'http://localhost:5000';

// 1. 뉴스 피드 가져오기 (Home 페이지)
export async function fetchNewsFeed({ country = 'US', category = null, limit = 12 } = {}) {
	try {
		const params = new URLSearchParams({
			country,
			limit: limit.toString()
		});
		if (category) params.append('category', category);

		const response = await fetch(`${BACKEND_URL}/api/news?${params}`);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		return data.articles || [];
	} catch (error) {
		console.error('News API error:', error);
		return [];
	}
}

// 2. ShortForm 콘텐츠 가져오기 (통합 형식)
export async function fetchShortFormContent() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/shortform`);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		// 각 항목에 shortgeul과 shorttoon이 모두 포함된 배열 반환
		return data.content || [];
	} catch (error) {
		console.error('ShortForm API error:', error);
		return [];
	}
}

// 3. Shorts 비디오 가져오기 (TOP 10)
export async function fetchVideoShorts() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/shorts/top10`);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		return data.videos || [];
	} catch (error) {
		console.error('Shorts API error:', error);
		return [];
	}
}
```

---

## 필요한 API 엔드포인트

백엔드 개발자가 구현해야 할 API 엔드포인트 목록입니다.

### 1️⃣ 뉴스 피드 API (Home 페이지)

```http
GET /api/news
```

**Query Parameters**:
- `country` (string, 기본값: "US"): 국가 코드 (US, IN, CN 등)
- `category` (string, 선택): 카테고리 (technology, business, sports 등)
- `limit` (number, 기본값: 12): 가져올 기사 수

**Response**:
```json
{
	"success": true,
	"articles": [
		{
			"id": "1",
			"title": "AI 기술의 새로운 혁신",
			"description": "AI 기술이 의료 분야를...",
			"content": "전체 기사 본문...",
			"urlToImage": "https://example.com/image.jpg",
			"source": {
				"name": "TechNews"
			},
			"publishedAt": "2025-12-06T10:30:00Z",
			"url": "https://example.com/article/1",
			"author": "홍길동",
			"category": "technology"
		}
		// ... 11개 더 (총 12개)
	]
}
```

### 2️⃣ ShortForm 콘텐츠 API (통합 형식)

```http
GET /api/shortform
```

**Query Parameters**: 없음 (모든 콘텐츠는 숏글과 숏툰을 모두 포함)

**Response (통합 데이터 구조)**:
```json
{
	"success": true,
	"content": [
		{
			"id": "sf-1",
			"newsId": "news-1",
			"shortgeul": {
				"id": "sg-1",
				"type": "shortgeul",
				"title": "AI 기술, 의료 분야 혁신 주도",
				"summary": "AI 기술이 의료 진단의 정확도를...",
				"pages": [
					{
						"type": "cover",
						"title": "AI 기술, 의료 분야 혁신 주도",
						"summary": "...",
						"source": "TechHealth Daily",
						"publishedAt": "3시간 전"
					},
					{
						"type": "content",
						"content": "AI 기반 진단 시스템은...",
						"caption": "주요 포인트 1"
					}
				]
			},
			"shorttoon": {
				"id": "st-1",
				"type": "shorttoon",
				"title": "AI 기술, 의료 분야 혁신 주도",
				"pages": [
					{
						"type": "comic",
						"image": "https://example.com/comics/panel1.jpg",
						"caption": "2025년, AI가 일상이 된 세상"
					},
					{
						"type": "comic",
						"image": "https://example.com/comics/panel2.jpg",
						"caption": "인간과 AI가 협력하여..."
					}
				]
			},
			"source": "TechHealth Daily",
			"publishedAt": "3시간 전",
			"url": "https://example.com/ai-healthcare"
		}
		// ... 더 많은 항목
	]
}
```

**중요**:
- 각 항목은 **반드시** `shortgeul`과 `shorttoon` 속성을 모두 포함해야 합니다
- `newsId`를 통해 같은 뉴스의 다른 형식임을 식별합니다
- 프론트엔드에서 탭에 따라 적절한 형식(shortgeul 또는 shorttoon)을 추출하여 표시합니다
- 탭 간 실시간 인덱스 공유로 사용자 경험을 향상시킵니다

### 3️⃣ Shorts 비디오 API (TOP 10)

```http
GET /api/shorts/top10
```

**Query Parameters**: 없음 (항상 오늘 날짜의 TOP 10 반환)

**Response**:
```json
{
	"success": true,
	"date": "2025-12-06",
	"videos": [
		{
			"id": "vs-1",
			"title": "AI 기술의 새로운 혁신: GPT-5 발표 임박",
			"videoUrl": "https://cdn.example.com/videos/ai-gpt5.mp4",
			"thumbnailUrl": "https://cdn.example.com/thumbnails/ai-gpt5.jpg",
			"source": "TechNews",
			"publishedAt": "3시간 전",
			"duration": 45,
			"url": "https://example.com/ai-gpt5-announcement"
		}
		// ... 정확히 10개
	]
}
```

**중요**:
- `videos` 배열은 **정확히 10개**여야 합니다
- `videoUrl`은 실제 재생 가능한 비디오 파일 URL이어야 합니다 (mp4, webm 등)
- `thumbnailUrl`은 필수입니다 (비디오 로딩 전 표시)

---

## 🚀 통합 예제: 전체 페이지 백엔드 연동

### src/components/NewsFeedGrid.jsx (완전 버전)

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNewsFeed } from '../api/contentAPI.js';

export default function NewsFeedGrid({ onToggleView }) {
	const navigate = useNavigate();
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadNews = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await fetchNewsFeed({ country: 'US', limit: 12 });
				setArticles(data);
			} catch (err) {
				setError('뉴스를 불러올 수 없습니다.');
			} finally {
				setLoading(false);
			}
		};
		loadNews();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-500 text-lg">{error}</p>
			</div>
		);
	}

	return (
		<div className="mb-6 sm:mb-10">
			{/* 섹션 헤더 */}
			<div className="mb-4 sm:mb-6 flex items-start justify-between">
				<div>
					<h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
						<span className="text-2xl">📰</span>
						뉴스 피드
					</h2>
					<p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
						최신 뉴스를 한눈에 확인하세요
					</p>
				</div>
				<button
					onClick={onToggleView}
					className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-all ease-in-out duration-150 active:scale-95 flex items-center gap-1.5 flex-shrink-0"
				>
					<span className="text-base">🌏</span>
					<span className="hidden sm:inline">지도 보기</span>
					<span className="sm:hidden">지도</span>
				</button>
			</div>

			{/* 3열 그리드 */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
				{articles.map((article) => (
					<article
						key={article.id}
						onClick={() => navigate('/shortform', { state: { article } })}
						className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-150 h-full flex flex-col cursor-pointer"
					>
						{/* 이미지 */}
						<div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
							{article.urlToImage ? (
								<img
									src={article.urlToImage}
									alt={article.title}
									className="w-full h-full object-cover"
									onError={(e) => {
										e.target.style.display = 'none';
									}}
								/>
							) : (
								<svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							)}
						</div>

						{/* 카드 내용 */}
						<div className="p-6 flex-1 flex flex-col">
							{/* 메타 정보 */}
							<div className="flex items-center justify-between text-xs text-gray-500 mb-4">
								<span className="flex items-center gap-1">
									<span>📡</span>
									<span>{article.source.name}</span>
								</span>
								<span>{new Date(article.publishedAt).toLocaleDateString('ko-KR')}</span>
							</div>

							{/* 제목 */}
							<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-auto line-clamp-3 group-hover:text-primary-500 transition-colors leading-tight">
								{article.title}
							</h3>

							{/* 인터랙션 버튼 */}
							<div className="flex items-center gap-6 pt-4 mt-4 border-t border-gray-100">
								<button
									onClick={(e) => {
										e.stopPropagation();
										alert('좋아요!');
									}}
									className="text-gray-600 hover:text-primary-500 transition-colors"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
									</svg>
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										alert('싫어요!');
									}}
									className="text-gray-600 hover:text-red-500 transition-colors"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
									</svg>
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										alert('댓글 작성!');
									}}
									className="text-gray-600 hover:text-primary-500 transition-colors ml-auto"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</button>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
```

---

## ✅ 체크리스트

백엔드 개발자가 확인해야 할 사항:

### 데이터베이스 스키마
- [ ] `articles` 테이블 (뉴스 기사)
- [ ] `shortform_content` 테이블 (숏글/숏툰)
- [ ] `video_shorts` 테이블 (비디오 정보)

### API 엔드포인트
- [ ] `GET /api/news` - 뉴스 피드
- [ ] `GET /api/shortform` - ShortForm 콘텐츠
- [ ] `GET /api/shorts/top10` - TOP 10 비디오

### 파일 저장소
- [ ] 이미지 저장소 (뉴스 썸네일, 숏툰 패널)
- [ ] 비디오 저장소 (Shorts 페이지)
- [ ] CDN 설정 (선택사항)

### CORS 설정
- [ ] 프론트엔드 도메인 허용 (localhost:5173)
- [ ] 필요한 HTTP 메서드 허용 (GET, POST)

---

## 📞 문의

백엔드 연동 중 문제가 발생하면:
1. 콘솔 로그 확인 (`console.error`)
2. 네트워크 탭 확인 (HTTP 상태 코드)
3. Mock 데이터로 폴백되는지 확인

**Mock 데이터 위치**:
- Home: `src/components/NewsFeedGrid.jsx` (하드코딩)
- ShortForm: `src/utils/mockShortFormData.js`
- Shorts: `src/utils/mockVideoData.js`
