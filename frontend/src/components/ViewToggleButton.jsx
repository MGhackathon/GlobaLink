import React from 'react';

export default function ViewToggleButton({ currentView, onToggle }) {
	const isFeedView = currentView === 'feed';

	return (
		<button
			onClick={onToggle}
			className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-4 sm:px-5 py-2.5 sm:py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all ease-in-out duration-150 active:scale-95 flex items-center gap-2"
			title={isFeedView ? '지도 보기로 전환' : '피드 보기로 전환'}
		>
			<span className="text-lg">{isFeedView ? '🌏' : '📰'}</span>
			<span className="hidden sm:inline">
				{isFeedView ? '지도 보기' : '피드 보기'}
			</span>
			<span className="sm:hidden">
				{isFeedView ? '지도' : '피드'}
			</span>
		</button>
	);
}
