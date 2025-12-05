import React from 'react';

export default function SnapCoverView({ article }) {
	return (
		<div className="absolute inset-0 flex items-center justify-center">
			{/* 배경 이미지 + 딤 처리 */}
			<div className="absolute inset-0">
				{article.urlToImage ? (
					<>
						<img
							src={article.urlToImage}
							alt={article.title}
							className="w-full h-full object-cover"
							onError={(e) => {
								e.target.style.display = 'none';
							}}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
					</>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600" />
				)}
			</div>

			{/* 콘텐츠 (중앙) */}
			<div className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-white">
				{/* 소스 배지 */}
				<div className="mb-6 text-center">
					<span className="inline-block px-4 py-1.5 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
						{article.source?.name || article.source}
					</span>
				</div>

				{/* 제목 */}
				<h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg text-center">
					{article.title}
				</h1>
			</div>
		</div>
	);
}
