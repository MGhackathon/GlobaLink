import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmark } from '../contexts/BookmarkContext.jsx';

export default function Sidebar({ isOpen, onClose }) {
	const { bookmarks, toggleBookmark, getBookmarkList } = useBookmark();
	const bookmarkList = getBookmarkList();
	const navigate = useNavigate();

	return (
		<>
			{/* 오버레이 */}
			<div 
				className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity ease-in-out duration-150 ${
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={onClose}
			/>
			
			{/* 사이드바 */}
			<div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-md transform transition-all ease-in-out duration-150 z-50 ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			}`}>
				{/* 사이드바 헤더 */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900">메뉴</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all ease-in-out duration-150 active:scale-95"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* 사이드바 메뉴 */}
				<div className="p-6 overflow-y-auto h-full pb-20">
					{/* Main 섹션 */}
					<div className="mb-8">
						<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
							Main
						</h3>
						<div className="space-y-1">
							{/* 홈 */}
							<button className="w-full flex items-center gap-4 px-4 py-4 text-left text-gray-700 hover:bg-[#F5F7FA] rounded-lg transition-all ease-in-out duration-150 active:scale-[0.98]">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
								</svg>
								<span className="text-sm font-medium">홈</span>
							</button>

							{/* 지도 보기 */}
							<button className="w-full flex items-center gap-4 px-4 py-4 text-left text-gray-700 hover:bg-[#F5F7FA] rounded-lg transition-all ease-in-out duration-150 active:scale-[0.98]">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
								</svg>
								<span className="text-sm font-medium">지도 보기</span>
								<span className="text-xs text-gray-400 ml-auto">지금 이 시간 다른 나라는?</span>
							</button>
						</div>
					</div>

					{/* Explore 섹션 */}
					<div className="mb-8">
						<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
							Explore
						</h3>
						<div className="space-y-1">
							{/* 쇼츠 */}
							<button 
								onClick={() => {
									navigate('/shorts');
									onClose();
								}}
								className="w-full flex items-center gap-4 px-4 py-4 text-left text-gray-700 hover:bg-[#F5F7FA] rounded-lg transition-all ease-in-out duration-150 active:scale-[0.98]"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
								<span className="text-sm font-medium">쇼츠</span>
							</button>
						</div>
					</div>

					{/* My Page 섹션 */}
					<div className="mb-8">
						<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
							My Page
						</h3>
						<div className="space-y-1">
							{/* 마이리스트 */}
							<button className="w-full flex items-center gap-4 px-4 py-4 text-left text-gray-700 hover:bg-[#F5F7FA] rounded-lg transition-all ease-in-out duration-150 active:scale-[0.98]">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
								</svg>
								<span className="text-sm font-medium">마이리스트</span>
								{bookmarkList.length > 0 && (
									<span className="ml-auto bg-primary-100 text-primary-600 text-xs font-medium px-2 py-0.5 rounded-full">
										{bookmarkList.length}
									</span>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}