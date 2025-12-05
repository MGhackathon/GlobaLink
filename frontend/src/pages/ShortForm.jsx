import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShortFormCard from '../components/ShortFormCard.jsx';
import { MOCK_SHORTGEUL_DATA, MOCK_SHORTTOON_DATA, convertToShortForm } from '../utils/mockShortFormData.js';

export default function ShortForm() {
	const [activeTab, setActiveTab] = useState('shortgeul');
	const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
	const [articles, setArticles] = useState([]);
	const containerRef = useRef(null);
	const location = useLocation();
	const navigate = useNavigate();

	// 초기 데이터 로드 (NewsFeedGrid에서 넘어온 article 포함)
	useEffect(() => {
		const initialArticle = location.state?.article;
		const mockData = activeTab === 'shortgeul' ? MOCK_SHORTGEUL_DATA : MOCK_SHORTTOON_DATA;

		if (initialArticle && activeTab === 'shortgeul') {
			// NewsFeedGrid에서 넘어온 기사를 ShortForm 형식으로 변환하여 맨 앞에 추가
			const convertedArticle = convertToShortForm(initialArticle);
			setArticles([convertedArticle, ...mockData]);
		} else {
			// 탭 전환 시에는 mock 데이터만 로드
			setArticles(mockData);
		}

		// 탭 전환 시 스크롤 맨 위로 리셋
		if (containerRef.current) {
			containerRef.current.scrollTop = 0;
			setCurrentArticleIndex(0);
		}
	}, [activeTab]);

	// 스크롤 이벤트로 현재 article index 추적
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const scrollTop = container.scrollTop;
			const itemHeight = window.innerHeight;
			const newIndex = Math.round(scrollTop / itemHeight);
			setCurrentArticleIndex(newIndex);
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	// 뒤로 가기
	const handleBack = () => {
		navigate(-1);
	};

	// 원문 보기
	const handleViewOriginal = () => {
		const currentArticle = articles[currentArticleIndex];
		if (currentArticle?.url) {
			window.open(currentArticle.url, '_blank');
		} else {
			alert('원문 링크가 없습니다.');
		}
	};

	return (
		<div className="h-screen w-full overflow-hidden bg-black relative">
			{/* Vertical Scroll Container (CSS Snap) */}
			<div
				ref={containerRef}
				className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{articles.map((article, index) => (
					<ShortFormCard
						key={article.id}
						article={article}
						isActive={index === currentArticleIndex}
						onViewOriginal={handleViewOriginal}
					/>
				))}
			</div>

			{/* Circular Emoji Tab Buttons (Top Center Overlay) */}
			<div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex gap-3">
				<button
					onClick={() => setActiveTab('shortgeul')}
					className={`
						w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 active:scale-95
						${activeTab === 'shortgeul' ? 'bg-primary-500 shadow-lg' : 'bg-white/20 hover:bg-white/30'}
					`}
				>
					<span className="text-2xl">📝</span>
				</button>
				<button
					onClick={() => setActiveTab('shorttoon')}
					className={`
						w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 active:scale-95
						${activeTab === 'shorttoon' ? 'bg-primary-500 shadow-lg' : 'bg-white/20 hover:bg-white/30'}
					`}
				>
					<span className="text-2xl">🎨</span>
				</button>
			</div>

			{/* Back Button (Top Left) */}
			<button
				onClick={handleBack}
				className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 flex items-center justify-center transition-all duration-200 active:scale-95"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
			</button>

			{/* Hide Scrollbar (CSS) */}
			<style>
				{`
					.snap-y::-webkit-scrollbar {
						display: none;
					}
				`}
			</style>
		</div>
	);
}
