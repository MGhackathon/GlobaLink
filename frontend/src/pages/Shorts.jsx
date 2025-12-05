import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DateHeader from '../components/DateHeader.jsx';
import VideoShortCard from '../components/VideoShortCard.jsx';
import { fetchVideoShorts } from '../api/contentAPI.js';

export default function Shorts() {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);
	const navigate = useNavigate();

	// Load video data (TOP 10)
	useEffect(() => {
		const loadVideos = async () => {
			setLoading(true);
			try {
				// Load video data from API (최대 10개)
				const data = await fetchVideoShorts();
				setVideos(data.slice(0, 10)); // TOP 10만 가져오기
			} catch (error) {
				console.error('비디오 로드 오류:', error);
				setVideos([]);
			} finally {
				setLoading(false);
			}
		};

		loadVideos();
	}, []);

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

	if (loading) {
		return (
			<div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<div className="text-center">
					<div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
					<p className="text-white text-lg font-medium">비디오를 불러오는 중...</p>
				</div>
			</div>
		);
	}

	if (videos.length === 0) {
		return (
			<div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<div className="text-center">
					<p className="text-white text-lg font-medium">비디오를 불러올 수 없습니다</p>
				</div>
			</div>
		);
	}

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
