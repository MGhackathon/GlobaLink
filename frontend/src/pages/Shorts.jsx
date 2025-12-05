import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DateHeader from '../components/DateHeader.jsx';
import VideoShortCard from '../components/VideoShortCard.jsx';
import { MOCK_VIDEO_SHORTS } from '../utils/mockVideoData.js';

export default function Shorts() {
	const [videos] = useState(MOCK_VIDEO_SHORTS);
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);
	const navigate = useNavigate();

	// Handle scroll to track current video index
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const scrollTop = container.scrollTop;
			const itemHeight = window.innerHeight;
			const newIndex = Math.round(scrollTop / itemHeight);
			setCurrentIndex(newIndex);
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, [videos]);

	return (
		<div className="h-screen overflow-hidden bg-black relative">
			{/* Date Header (Top Center) */}
			<DateHeader />

			{/* Video Container with Snap Scrolling */}
			<div
				ref={containerRef}
				className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{videos.map((video, index) => (
					<VideoShortCard
						key={video.id}
						video={video}
						isActive={index === currentIndex}
					/>
				))}
			</div>

			{/* Back Button (Top Left) */}
			<button
				onClick={() => navigate('/')}
				className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 flex items-center justify-center transition-all duration-200 active:scale-95"
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
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
			</button>

			{/* Hide Scrollbar CSS */}
			<style>
				{`
					.hide-scrollbar::-webkit-scrollbar {
						display: none;
					}
				`}
			</style>
		</div>
	);
}
