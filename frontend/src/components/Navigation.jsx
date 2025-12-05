import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navigation({
	onToggleSidebar
}) {
	const { isLoggedIn, userName, login } = useAuth();
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

					{/* 우측: 로그인/회원가입 버튼 또는 프로필 */}
					<div className="flex items-center gap-1.5 sm:gap-2">
						{!isLoggedIn ? (
							<>
								<button
									onClick={login}
									className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-primary-500 transition-all ease-in-out duration-150 rounded-lg hover:bg-white/50 active:scale-95"
								>
									로그인
								</button>
								<button
									disabled
									className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-semibold text-white bg-primary-500 rounded-lg transition-all ease-in-out duration-150 shadow-sm opacity-50 cursor-not-allowed"
								>
									회원가입
								</button>
							</>
						) : (
							<div className="flex items-center gap-2">
								<span className="text-xs sm:text-sm font-medium text-gray-700">
									{userName}님
								</span>
								<div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
									<svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
