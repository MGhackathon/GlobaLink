import React, { useRef, useState } from 'react';
import NewsCard from './NewsCard.jsx';
import NewsDetailModal from './NewsDetailModal.jsx';
import CategorySelector from './CategorySelector.jsx';
import TodayKeywords from './TodayKeywords.jsx';

export default function CountryWindow({ open, countryCode, topArticles = [], selectedCategory, onCategoryChange, loading = false }) {
	if (!open) return null;

	const [activeTab, setActiveTab] = useState('top10');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedArticle, setSelectedArticle] = useState(null);
	const sliderRef = useRef(null);

	const handleShowDetail = (article) => {
		setSelectedArticle(article);
		setIsModalOpen(true);
	};

	const handleRelatedArticleClick = (relatedArticle) => {
		// 관련 뉴스 클릭 시 해당 기사로 전환
		setSelectedArticle(relatedArticle);
		// 모달이 이미 열려있으면 상태만 업데이트, 아니면 열기
		if (!isModalOpen) {
			setIsModalOpen(true);
		}
	};

	const handleScroll = (direction) => {
		const el = sliderRef.current;
		if (!el) return;
		const amount = el.clientWidth; // 한 화면 너비만큼 이동
		el.scrollBy({ left: direction * amount, behavior: 'smooth' });
	};

	// 패널(페이지) 구성: 카드 3개씩 묶음
	const items = (topArticles?.slice(0, 10) || []);
	const panels = (() => {
		if (items.length === 0) return [Array(3).fill(null)];
		const groups = [];
		for (let i = 0; i < items.length; i += 3) {
			groups.push(items.slice(i, i + 3));
		}
		return groups;
	})();

	return (
		<>
			<div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-0 mb-6 sm:mb-8">
				{/* 상단 탭 바 */}
				<div className="border-b border-gray-200 bg-white rounded-t-lg">
					<div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2 h-auto sm:h-16 py-3 sm:py-0">
							<div className="flex items-center gap-2 w-full sm:w-auto">
								<button
									className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ease-in-out duration-150 ${
										activeTab === 'top10' ? 'bg-primary-500 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100 active:scale-95'
									}`}
									onClick={() => setActiveTab('top10')}
								>
									<span className="hidden sm:inline">오늘의 Top 10 뉴스</span>
									<span className="sm:hidden">Top 10</span>
								</button>
								<button
									className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ease-in-out duration-150 ${
										activeTab === 'keywords' ? 'bg-primary-500 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100 active:scale-95'
									}`}
									onClick={() => setActiveTab('keywords')}
								>
									오늘의 키워드
								</button>
							</div>
							<div className="ml-0 sm:ml-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
								<div className="flex items-center gap-2 sm:gap-2.5">
									<span className="text-xs sm:text-sm font-medium text-gray-600">카테고리:</span>
									<CategorySelector value={selectedCategory} onChange={onCategoryChange} />
								</div>
								<div className="text-xs sm:text-sm font-normal text-gray-600">
									선택된 국가: <span className="font-semibold text-primary-500">{countryCode}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 내용 영역 */}
				<div className="p-3 sm:p-4 md:p-6 min-h-[50vh] sm:min-h-[70vh]">
					{activeTab === 'top10' ? (
						<div className="relative">
							{/* 로딩 상태 */}
							{loading ? (
								<div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
									<div className="text-center">
										<div className="animate-spin h-10 w-10 sm:h-12 sm:w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-3 sm:mb-4"></div>
										<p className="text-gray-700 font-semibold text-sm sm:text-base">뉴스를 불러오는 중...</p>
										<p className="text-gray-500 text-xs sm:text-sm mt-2 font-normal px-4">{countryCode}의 최신 뉴스를 가져오고 있습니다.</p>
									</div>
								</div>
							) : items.length > 0 ? (
								<>
									{/* 좌우 이동 버튼 */}
									<button
										className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all ease-in-out duration-150 active:scale-95"
										onClick={() => handleScroll(-1)}
										aria-label="이전"
									>
										<svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
									</button>
									<button
										className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all ease-in-out duration-150 active:scale-95"
										onClick={() => handleScroll(1)}
										aria-label="다음"
									>
										<svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
									</button>

									<div ref={sliderRef} className="overflow-x-auto">
										<div className="grid grid-flow-col gap-3 sm:gap-4" style={{ gridAutoColumns: '100%' }}>
											{panels.map((panel, pIdx) => (
												<div key={`panel-${pIdx}`} className="grid gap-3 sm:gap-4 md:grid-cols-3 min-h-[50vh] sm:min-h-[70vh]">
													{panel.map((article, idx) => (
														article ? (
															<NewsCard
																key={`card-${pIdx}-${idx}`}
																title={article.title}
																description={article.description}
																source={article.source}
																url={article.url}
																urlToImage={article.urlToImage}
																publishedAt={article.publishedAt}
																onShowDetail={handleShowDetail}
																delay={idx * 100}
															/>
														) : (
															<div key={`placeholder-${pIdx}-${idx}`} className="h-full rounded-lg border border-gray-200 bg-gray-50" />
														)
													))}
												</div>
											))}
										</div>
									</div>
								</>
							) : (
								<div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
									<div className="text-center">
										<div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📰</div>
										<p className="text-gray-700 font-semibold text-base sm:text-lg md:text-xl mb-2 px-4">뉴스를 찾을 수 없습니다</p>
										<p className="text-gray-500 text-xs sm:text-sm font-normal px-4">{countryCode}에 대한 뉴스가 없거나 카테고리를 변경해보세요.</p>
									</div>
								</div>
							)}
						</div>
					) : (
						<TodayKeywords articles={topArticles} country={countryCode} />
					)}
				</div>
			</div>

			{/* 모달 */}
			<NewsDetailModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				article={selectedArticle}
				relatedArticles={topArticles}
				onRelatedArticleClick={handleRelatedArticleClick}
			/>
		</>
	);
}


