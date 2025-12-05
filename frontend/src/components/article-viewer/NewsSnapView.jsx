import React from 'react';

export default function NewsSnapView({ article }) {
	return (
		<div className="h-screen flex items-center justify-center bg-white px-4 md:px-8">
			{/* 카드 컨테이너 */}
			<div className="w-full max-w-2xl bg-white rounded-lg shadow-lg border border-gray-100 p-8 md:p-12">
				{/* 제목 */}
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
					{article.title}
				</h2>

				{/* 요약문 */}
				<div className="space-y-4 mb-8">
					<p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
						{article.description || '기사 내용을 불러오는 중입니다...'}
					</p>
				</div>

				{/* 하단 정보 */}
				<div className="flex items-center gap-3 pt-6 border-t border-gray-200">
					{/* 소스 배지 */}
					<span className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full border border-gray-200">
						📰 {article.source?.name || article.source}
					</span>

					{/* 발행일 */}
					{article.publishedAt && (
						<span className="text-xs text-gray-500">
							{new Date(article.publishedAt).toLocaleDateString('ko-KR')}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
