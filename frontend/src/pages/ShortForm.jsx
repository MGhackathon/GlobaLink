import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShortFormCard from '../components/ShortFormCard.jsx';
import { MOCK_SHORTFORM_DATA, convertToShortForm } from '../utils/mockShortFormData.js';

export default function ShortForm() {
	const [activeTab, setActiveTab] = useState('shortgeul');
	const [currentIndex, setCurrentIndex] = useState(0);  // 공유 인덱스
	const [articles, setArticles] = useState([]);
	const containerRef = useRef(null);
	const currentIndexRef = useRef(0);  // 최신 인덱스 참조
	const location = useLocation();
	const navigate = useNavigate();

	// currentIndex 변경 시 ref 업데이트
	useEffect(() => {
		currentIndexRef.current = currentIndex;
	}, [currentIndex]);

	// 초기 데이터 로드 (NewsFeedGrid에서 넘어온 article 포함)
	useEffect(() => {
		const initialArticle = location.state?.article;

		// Mock 데이터에서 현재 탭에 맞는 형식만 추출
		const formattedData = MOCK_SHORTFORM_DATA.map(item =>
			activeTab === 'shortgeul' ? item.shortgeul : item.shorttoon
		);

		if (initialArticle && activeTab === 'shortgeul') {
			// NewsFeedGrid에서 넘어온 기사를 ShortForm 형식으로 변환하여 맨 앞에 추가
			const convertedArticle = convertToShortForm(initialArticle);
			setArticles([convertedArticle, ...formattedData]);
		} else {
			// 탭 전환 시에는 통합 데이터에서 추출한 형식만 로드
			setArticles(formattedData);
		}

		// 탭 전환 시 현재 인덱스로 스크롤 (인덱스 공유)
		if (containerRef.current) {
			// 최신 인덱스 사용 (ref를 통해)
			const safeIndex = Math.min(currentIndexRef.current, formattedData.length - 1);
			const scrollTop = safeIndex * window.innerHeight;

			// 부드러운 스크롤 대신 즉시 이동
			containerRef.current.scrollTop = scrollTop;
		}
	}, [activeTab]);

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

	// 뒤로 가기
	const handleBack = () => {
		navigate(-1);
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
						isActive={index === currentIndex}
					/>
				))}
			</div>

			{/* Circular Emoji Tab Buttons (Top Center Overlay) */}
			<div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-3">
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
