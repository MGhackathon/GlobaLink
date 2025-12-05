import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SHORTGEUL_DATA } from '../utils/mockShortFormData.js';

export default function NewsFeedGrid({ onToggleView }) {
	const navigate = useNavigate();
	// 실제 크롤링된 뉴스 데이터 사용 (광고 제외)
	const newsArticles = MOCK_SHORTGEUL_DATA.filter(item => !item.isAd).slice(0, 12);

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
				{/* 지도 보기 버튼 (우측 상단) */}
				<button
					onClick={onToggleView}
					className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-all ease-in-out duration-150 active:scale-95 flex items-center gap-1.5 flex-shrink-0"
				>
					<span className="text-base">🌏</span>
					<span className="hidden sm:inline">지도 보기</span>
					<span className="sm:hidden">지도</span>
				</button>
			</div>

		{/* 3열 그리드 (반응형) */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
			{newsArticles.map((article) => (
				<article
					key={article.id}
					onClick={() => navigate('/shortform', { state: { article } })}
					className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all ease-in-out duration-150 h-full flex flex-col cursor-pointer"
				>
					{/* 이미지 */}
					<div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
						{article.pages && article.pages[0] && article.pages[0].image ? (
							<img
								src={article.pages[0].image}
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
					{/* 메타 정보 (상단) */}
					<div className="flex items-center justify-between text-xs text-gray-500 mb-4">
						<span className="flex items-center gap-1">
							<span>📡</span>
							<span>{article.source}</span>
						</span>
						<span>{new Date(article.publishedAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</span>
					</div>

					{/* 제목 (더 크게, 강조) */}
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
