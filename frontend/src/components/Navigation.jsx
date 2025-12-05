import React from 'react';

export default function Navigation({ 
	onToggleSidebar
}) {
	return (
		<nav className="bg-transparent backdrop-blur-sm relative z-50 sticky top-0">
			<div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7">
				<div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
					{/* 왼쪽: 햄버거 메뉴 */}
					<div className="flex items-center">
						<button 
							onClick={onToggleSidebar}
							className="p-2 sm:p-2.5 rounded-lg text-gray-600 hover:text-primary-500 hover:bg-white/50 transition-all ease-in-out duration-150 active:scale-95"
							title="메뉴 열기"
						>
							<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>

					{/* 우측: 로그인/회원가입 버튼 */}
					<div className="flex items-center gap-1.5 sm:gap-2">
						<button className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-primary-500 transition-all ease-in-out duration-150 rounded-lg hover:bg-white/50 active:scale-95">
							로그인
						</button>
						<button className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-all ease-in-out duration-150 shadow-sm hover:shadow-md active:scale-95">
							회원가입
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
