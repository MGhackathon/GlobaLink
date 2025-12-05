import React from 'react';

export default function ViewModeToggle({ currentMode, onToggle, articleUrl }) {
	return (
		<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
			{/* 모드 전환 버튼 */}
			<button
				onClick={onToggle}
				className="px-6 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2"
			>
				<span className="text-lg">
					{currentMode === 'cover' ? '📄' : '🖼️'}
				</span>
				<span className="text-sm md:text-base">
					{currentMode === 'cover' ? '뉴스 스냅' : '스냅 커버'}
				</span>
			</button>

			{/* 원문 보기 버튼 (뉴스 스냅 모드일 때만) */}
			{currentMode === 'news' && articleUrl && (
				<button
					onClick={() => window.open(articleUrl, '_blank')}
					className="px-6 py-3 rounded-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2"
				>
					<span className="text-lg">🔗</span>
					<span className="text-sm md:text-base">원문 보기</span>
				</button>
			)}
		</div>
	);
}
