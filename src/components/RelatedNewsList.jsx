import React from 'react';
import { extractCategoriesFromArticle, CATEGORY_COLORS, CATEGORY_NAMES } from '../utils/categoryUtils.js';

export default function RelatedNewsList({ articles = [], onArticleClick, currentArticleUrl }) {
	// 현재 기사 제외하고 최대 5개만 표시
	const filteredArticles = articles
		.filter(article => article.url !== currentArticleUrl)
		.slice(0, 5);

	if (filteredArticles.length === 0) {
		return null;
	}

	return (
		<div className="w-full lg:w-80 flex-shrink-0">
			<h3 className="text-lg font-semibold text-gray-800 mb-4">관련 뉴스</h3>
			<div className="space-y-3">
				{filteredArticles.map((article, index) => {
					const categories = extractCategoriesFromArticle(article);
					const mainCategory = categories[0];
					const categoryColors = mainCategory ? CATEGORY_COLORS[mainCategory] : null;
					const categoryName = mainCategory ? CATEGORY_NAMES[mainCategory] : null;

					return (
						<button
							key={article.url || index}
							onClick={() => onArticleClick && onArticleClick(article)}
							className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 hover:shadow-md transition-all duration-200 text-left group"
						>
							<div className="flex gap-3">
								{/* 썸네일 */}
								{article.urlToImage ? (
									<div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
										<img
											src={article.urlToImage}
											alt={article.title || 'News thumbnail'}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
											onError={(e) => {
												e.target.style.display = 'none';
											}}
										/>
									</div>
								) : (
									<div className="w-20 h-20 flex-shrink-0 rounded-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
										<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
								)}

								{/* 제목 및 카테고리 */}
								<div className="flex-1 min-w-0 flex flex-col gap-2">
									<h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
										{article.title || 'Untitled'}
									</h4>
									{categoryName && categoryColors && (
										<span
											className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border} border w-fit`}
										>
											{categoryName}
										</span>
									)}
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}


