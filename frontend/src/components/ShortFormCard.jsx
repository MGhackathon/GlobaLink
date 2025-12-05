import React, { useState, useRef, useEffect } from 'react';
import ShortFormActionBar from './ShortFormActionBar.jsx';

export default function ShortFormCard({ article, isActive }) {
	const [currentPage, setCurrentPage] = useState(0);
	const [touchStartX, setTouchStartX] = useState(0);
	const [touchEndX, setTouchEndX] = useState(0);
	const [showIndicator, setShowIndicator] = useState(false);
	const carouselRef = useRef(null);
	const indicatorTimeoutRef = useRef(null);

	const pages = article.pages || [];
	const totalPages = pages.length;

	// 현재 카드의 원문 보기
	const handleViewOriginal = () => {
		if (article.url) {
			window.open(article.url, '_blank');
		} else {
			alert('원문 링크가 없습니다.');
		}
	};

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (indicatorTimeoutRef.current) {
				clearTimeout(indicatorTimeoutRef.current);
			}
		};
	}, []);

	// 터치 시작
	const handleTouchStart = (e) => {
		setTouchStartX(e.touches[0].clientX);

		// 인디케이터 표시
		setShowIndicator(true);

		// 기존 타임아웃 클리어
		if (indicatorTimeoutRef.current) {
			clearTimeout(indicatorTimeoutRef.current);
		}

		// 3초 후 인디케이터 숨김
		indicatorTimeoutRef.current = setTimeout(() => {
			setShowIndicator(false);
		}, 3000);
	};

	// 터치 이동
	const handleTouchMove = (e) => {
		setTouchEndX(e.touches[0].clientX);
	};

	// 터치 종료 (스와이프 감지)
	const handleTouchEnd = () => {
		const swipeThreshold = 50; // 50px 이상 움직여야 인식
		const diff = touchStartX - touchEndX;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0 && currentPage < totalPages - 1) {
				// 왼쪽으로 스와이프 -> 다음 페이지
				setCurrentPage((prev) => prev + 1);
			} else if (diff < 0 && currentPage > 0) {
				// 오른쪽으로 스와이프 -> 이전 페이지
				setCurrentPage((prev) => prev - 1);
			}
		}

		// 터치 상태 리셋
		setTouchStartX(0);
		setTouchEndX(0);
	};

	// 그라디언트 배경 생성 (숏툰용)
	const getGradientStyle = (imageKey) => {
		const gradients = {
			'gradient-1': 'from-blue-400 to-purple-600',
			'gradient-2': 'from-green-400 to-blue-600',
			'gradient-3': 'from-yellow-400 to-orange-600',
			'gradient-4': 'from-pink-400 to-red-600',
			'gradient-5': 'from-indigo-400 to-purple-600',
			'gradient-6': 'from-teal-400 to-green-600',
			'gradient-7': 'from-orange-400 to-red-600',
			'gradient-8': 'from-cyan-400 to-blue-600',
			'gradient-9': 'from-purple-400 to-pink-600',
			'gradient-10': 'from-lime-400 to-green-600',
			'gradient-11': 'from-amber-400 to-orange-600',
			'gradient-12': 'from-rose-400 to-pink-600',
			'gradient-13': 'from-sky-400 to-indigo-600',
			'gradient-14': 'from-emerald-400 to-teal-600',
			'gradient-15': 'from-violet-400 to-purple-600',
			'gradient-16': 'from-fuchsia-400 to-pink-600',
			'gradient-17': 'from-red-400 to-orange-600',
			'gradient-18': 'from-blue-500 to-cyan-600',
			'gradient-19': 'from-green-500 to-emerald-600',
			'gradient-20': 'from-yellow-500 to-amber-600',
			'gradient-21': 'from-pink-500 to-rose-600',
			'gradient-22': 'from-indigo-500 to-blue-600',
			'gradient-23': 'from-purple-500 to-pink-600',
			'gradient-24': 'from-teal-500 to-cyan-600',
			'gradient-25': 'from-orange-500 to-red-600',
			'gradient-26': 'from-lime-500 to-green-600',
			'gradient-27': 'from-cyan-500 to-blue-600',
			'gradient-28': 'from-amber-500 to-orange-600',
			'gradient-29': 'from-rose-500 to-pink-600',
			'gradient-30': 'from-sky-500 to-indigo-600',
			'gradient-31': 'from-emerald-500 to-teal-600',
			'gradient-32': 'from-violet-500 to-purple-600',
			'gradient-33': 'from-fuchsia-500 to-pink-600',
			'gradient-34': 'from-red-500 to-orange-600',
			'gradient-35': 'from-blue-600 to-purple-600'
		};
		return gradients[imageKey] || 'from-gray-400 to-gray-600';
	};

	// 표지 페이지 렌더링 (숏글)
	const renderCoverPage = (page) => (
		<div className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-primary-500 to-orange-600 text-white">
			{/* 상단: 출처 및 시간 */}
			<div className="flex items-center justify-between text-sm opacity-90">
				<span className="font-medium">{page.source}</span>
				<span>{page.publishedAt}</span>
			</div>

			{/* 중앙: 제목 및 요약 */}
			<div className="flex-1 flex flex-col justify-center">
				<h2 className="text-2xl font-bold mb-4 leading-tight">{page.title}</h2>
				<p className="text-base leading-relaxed opacity-95">{page.summary}</p>
			</div>

			{/* 하단: 뱃지 */}
			<div className="flex items-center gap-2">
				<span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
					카드뉴스
				</span>
				<span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
					{totalPages}페이지
				</span>
			</div>
		</div>
	);

	// 콘텐츠 페이지 렌더링 (숏글)
	const renderContentPage = (page) => (
		<div className="h-full flex flex-col p-6 bg-white">
			{/* 캡션 (상단) */}
			{page.caption && (
				<div className="mb-4">
					<span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-semibold">
						{page.caption}
					</span>
				</div>
			)}

			{/* 콘텐츠 */}
			<div className="flex-1 flex items-center justify-center">
				<p className="text-lg text-gray-800 leading-relaxed text-center">
					{page.content}
				</p>
			</div>

			{/* 이미지 플레이스홀더 (하단) */}
			{page.image && (
				<div className="mt-4 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
					<svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			)}
		</div>
	);

	// 컷툰 페이지 렌더링 (숏툰)
	const renderComicPage = (page) => (
		<div className={`h-full relative bg-gradient-to-br ${getGradientStyle(page.image)} flex items-center justify-center p-6`}>
			{/* 캡션 (하단) */}
			{page.caption && (
				<div className="absolute bottom-6 left-6 right-6">
					<div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
						<p className="text-white text-base font-medium text-center leading-relaxed">
							{page.caption}
						</p>
					</div>
				</div>
			)}

			{/* 이미지 플레이스홀더 (중앙) */}
			<div className="text-white text-opacity-40">
				<svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</div>
		</div>
	);

	return (
		<div className="h-screen snap-start snap-always flex flex-col justify-center bg-black pt-24 pb-28 relative">
			{/* 9:16 Aspect Ratio Container (TikTok/Reels Standard) */}
			<div className="relative aspect-[9/16] w-full bg-white overflow-hidden mx-auto">
				{/* Carousel Wrapper */}
				<div
					ref={carouselRef}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					className="h-full overflow-hidden relative"
					style={{ touchAction: 'pan-y' }}
				>
					{/* Carousel Inner */}
					<div
						className="h-full flex transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
						style={{
							transform: `translateX(-${currentPage * 100}%)`,
							width: `${totalPages * 100}%`
						}}
					>
						{pages.map((page, index) => (
							<div
								key={index}
								className="h-full flex-shrink-0"
								style={{ width: `${100 / totalPages}%` }}
							>
								{/* 숏글 렌더링 */}
								{article.type === 'shortgeul' && (
									<>
										{page.type === 'cover' && renderCoverPage(page)}
										{page.type === 'content' && renderContentPage(page)}
									</>
								)}

								{/* 숏툰 렌더링 */}
								{article.type === 'shorttoon' && renderComicPage(page)}
							</div>
						))}
					</div>
				</div>

				{/* Page Indicator Dots - 터치 시에만 나타남 */}
				{totalPages > 1 && (
					<div
						className={`
							absolute bottom-6 left-1/2 -translate-x-1/2 z-20
							transition-opacity duration-300
							${showIndicator ? 'opacity-100' : 'opacity-0'}
						`}
					>
						<div className="flex gap-1.5 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-full">
							{pages.map((_, idx) => (
								<div
									key={idx}
									className={`
										h-2 rounded-full transition-all duration-300
										${idx === currentPage ? 'w-6 bg-white' : 'w-2 bg-white/50'}
									`}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* 원문보기 플로팅 버튼 (우측 하단) */}
			<button
				onClick={handleViewOriginal}
				className="absolute bottom-20 right-6 z-30 w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</button>

			{/* Action Bar (Below Content) */}
			<ShortFormActionBar articleId={article.id} />
		</div>
	);
}
