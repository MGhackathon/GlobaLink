import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import Sidebar from '../components/Sidebar.jsx';
import WorldMap from '../components/WorldMap.jsx';
import CountryWindow from '../components/CountryWindow.jsx';
import CategorySelector from '../components/CategorySelector.jsx';
import NewsFeedGrid from '../components/NewsFeedGrid.jsx';
import { fetchNews } from '../api/newsAPI.js';
import { useOnboarding } from '../contexts/OnboardingContext.jsx';

export default function Home() {
	const [viewMode, setViewMode] = useState('feed'); // 'feed' or 'map'
	const [country, setCountry] = useState(null);
	const [category, setCategory] = useState(null);
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const newsRef = useRef(null);
	const hasMountedRef = useRef(false);
	const [isCountryWindowOpen, setIsCountryWindowOpen] = useState(false);
	const navigate = useNavigate();
	const { resetOnboarding } = useOnboarding();

	const handleGoToOnboarding = () => {
		resetOnboarding();
		navigate('/onboarding');
	};

	useEffect(() => {
		if (!country) return;

		(async () => {
			setLoading(true);
			const results = await fetchNews({ countryCode: country, category: category });
			setArticles(results);
			setLoading(false);

			// 국가 선택 시 뉴스 섹션으로 부드럽게 스크롤
			if (newsRef.current) {
				setTimeout(() => {
					newsRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'nearest'
					});
				}, 120);
			}

			// 국가 선택 시 CountryWindow 열기
			setIsCountryWindowOpen(true);
			hasMountedRef.current = true;
		})();
	}, [country, category]);

	const handleCountryReset = () => {
		setCountry(null);
		setCategory(null);
		setIsCountryWindowOpen(false);
		setArticles([]);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* 네비게이션 바 */}
			<Navigation 
				onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
			/>

			{/* 사이드바 */}
			<Sidebar 
				isOpen={isSidebarOpen} 
				onClose={() => setIsSidebarOpen(false)} 
			/>

			{/* 메인 컨텐츠 */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* 브랜딩 블록 - 화면 중앙에 배치 */}
				<section className="flex flex-col items-center justify-center pt-4 sm:pt-8 pb-4 sm:pb-6 mb-4 sm:mb-6">
					{/* 로고 */}
					<div className="mb-3 sm:mb-6">
						<img
							src="/logo.png"
							alt="GlobaLink"
							className="h-10 sm:h-14 md:h-16 w-auto object-contain mx-auto"
							onError={(e) => {
								e.target.style.display = 'none';
							}}
						/>
					</div>

					{/* 인사말 */}
					<p className="text-sm sm:text-base md:text-lg font-medium text-gray-700 text-center px-4 mb-3 sm:mb-5">
						안녕하세요! 오늘도 새로운 뉴스를 함께 읽어볼까요?
					</p>

					{/* 펭귄 마스코트 - 모바일에서 크기 축소 */}
					<div className="w-24 h-24 sm:w-40 sm:h-40 md:w-52 md:h-52">
						<img
							src="/character.png"
							alt="Character"
							className="w-full h-full object-contain animate-bounce"
							onError={(e) => {
								e.target.style.display = 'none';
							}}
						/>
					</div>
				</section>

				{/* 조건부 렌더링: 피드 뷰 또는 지도 뷰 */}
				{viewMode === 'feed' ? (
					// 뉴스 피드 뷰
					<NewsFeedGrid onToggleView={() => setViewMode('map')} />
				) : (
					// 지도 뷰 (기존 코드)
					<>
						{/* 세계 지도 섹션 */}
						<section className="mb-6 sm:mb-10">
							{/* 섹션 헤더 */}
							<div className="mb-4 sm:mb-6 flex items-start justify-between">
								<div>
									<h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
										<span className="text-2xl">🗺️</span>
										세계 지도
									</h2>
									<p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
										지도에서 국가를 선택하여 뉴스를 확인하세요
									</p>
								</div>
								{/* 뉴스 피드 보기 버튼 */}
								<button
									onClick={() => setViewMode('feed')}
									className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-all ease-in-out duration-150 active:scale-95 flex items-center gap-1.5 flex-shrink-0"
									title="뉴스 피드로 이동"
								>
									<span className="text-base">📰</span>
									<span className="hidden sm:inline">뉴스 피드 보기</span>
									<span className="sm:hidden">피드</span>
								</button>
							</div>

							<WorldMap selectedCountry={country} onCountrySelect={setCountry} />
						</section>

						{/* 뉴스 섹션 */}
						<section className="scroll-mt-20" ref={newsRef}>
							<div className="flex items-center justify-between mb-4 sm:mb-6">
								<h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
									📰 {country ? `${country} 주요 뉴스` : '글로벌 뉴스'}
								</h2>
								{loading && (
									<div className="flex items-center gap-2.5 text-primary-500">
										<svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span className="text-sm font-medium">로딩 중...</span>
									</div>
								)}
							</div>

							{/* CountryWindow 컴포넌트 */}
							<CountryWindow
								open={isCountryWindowOpen}
								countryCode={country}
								topArticles={articles}
								selectedCategory={category}
								onCategoryChange={setCategory}
								loading={loading}
							/>

							{/* 국가 선택 안내 메시지 */}
							{!country && (
								<div className="text-center py-8 sm:py-12 md:py-16">
									<div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🗺️</div>
									<p className="text-gray-700 text-base sm:text-lg md:text-xl font-semibold mb-2">국가를 선택해주세요</p>
									<p className="text-gray-500 text-xs sm:text-sm font-normal px-4">지도에서 국가를 클릭하거나 드롭다운에서 검색하세요.</p>
								</div>
							)}
						</section>
					</>
				)}
			</main>

			{/* 푸터 */}
			<footer className="bg-white border-t border-gray-200 mt-10 sm:mt-16 md:mt-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
					<p className="text-center text-gray-600 text-xs sm:text-sm font-normal">
						© 2025 GlobaLink - 2025 AI Hackathon Project
					</p>
				</div>
			</footer>
		</div>
	);
}
