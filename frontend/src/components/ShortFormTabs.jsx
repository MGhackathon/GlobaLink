import React from 'react';

export default function ShortFormTabs({ activeTab, onTabChange }) {
	return (
		<div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
			<div className="max-w-md mx-auto px-4 py-3 flex items-center justify-center gap-2">
				{/* 숏글 탭 */}
				<button
					onClick={() => onTabChange('shortgeul')}
					className={`
						px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out
						${
							activeTab === 'shortgeul'
								? 'bg-primary-500 text-white shadow-md scale-105'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						}
					`}
				>
					📝 숏글
				</button>

				{/* 숏툰 탭 */}
				<button
					onClick={() => onTabChange('shorttoon')}
					className={`
						px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out
						${
							activeTab === 'shorttoon'
								? 'bg-primary-500 text-white shadow-md scale-105'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						}
					`}
				>
					🎨 숏툰
				</button>
			</div>
		</div>
	);
}
