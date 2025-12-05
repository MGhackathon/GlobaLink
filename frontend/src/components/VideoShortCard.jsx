import React, { useState, useEffect, useRef } from 'react';
import { useBookmark } from '../contexts/BookmarkContext.jsx';

export default function VideoShortCard({ video, isActive }) {
	const videoRef = useRef(null);
	const [isMuted, setIsMuted] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [likedVideos, setLikedVideos] = useState(new Set());
	const { toggleBookmark, isBookmarked } = useBookmark();

	// Load liked videos from localStorage
	useEffect(() => {
		const liked = JSON.parse(localStorage.getItem('likedVideos') || '[]');
		setLikedVideos(new Set(liked));
	}, []);

	// Intersection Observer for auto-play/pause
	useEffect(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
						// Video is 75% visible - play
						videoElement.play()
							.then(() => setIsPlaying(true))
							.catch((err) => {
								console.log('Autoplay prevented:', err);
								setIsPlaying(false);
							});
					} else {
						// Video scrolled out of view - pause
						videoElement.pause();
						setIsPlaying(false);
					}
				});
			},
			{ threshold: [0.5, 0.75, 1.0] }
		);

		observer.observe(videoElement);
		return () => observer.disconnect();
	}, []);

	// Toggle mute
	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	// Handle video loading
	const handleLoadedData = () => {
		setIsLoading(false);
	};

	const handleWaiting = () => {
		setIsLoading(true);
	};

	const handleCanPlay = () => {
		setIsLoading(false);
	};

	// Handle like
	const handleLike = () => {
		const liked = new Set(likedVideos);
		if (liked.has(video.id)) {
			liked.delete(video.id);
		} else {
			liked.add(video.id);
		}
		setLikedVideos(liked);
		localStorage.setItem('likedVideos', JSON.stringify([...liked]));
	};

	// Handle bookmark
	const handleBookmark = () => {
		const videoData = {
			id: video.id,
			title: video.title,
			description: video.title,
			source: video.source,
			url: video.url,
			urlToImage: video.thumbnailUrl,
			publishedAt: video.publishedAt
		};
		toggleBookmark(video.id, videoData);
	};

	// Handle share
	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: video.title,
					text: video.title,
					url: video.url || window.location.href
				});
			} catch (error) {
				console.error('Error sharing:', error);
			}
		} else {
			// Fallback: copy to clipboard
			const text = `${video.title}\n${video.url || ''}`;
			await navigator.clipboard.writeText(text);
			alert('링크가 클립보드에 복사되었습니다!');
		}
	};

	const isLiked = likedVideos.has(video.id);
	const isBookmarkedVideo = isBookmarked(video.id);

	return (
		<div className="h-screen snap-start snap-always flex items-center justify-center bg-black relative">
			{/* Video Container (9:16 aspect ratio) */}
			<div className="relative aspect-[9/16] w-full max-w-md h-full">
				{/* HTML5 Video Element */}
				<video
					ref={videoRef}
					src={video.videoUrl}
					poster={video.thumbnailUrl}
					loop
					muted={isMuted}
					playsInline
					className="w-full h-full object-cover"
					onLoadedData={handleLoadedData}
					onWaiting={handleWaiting}
					onCanPlay={handleCanPlay}
				/>

				{/* Loading Spinner */}
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center bg-black/50">
						<div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
					</div>
				)}

				{/* Mute Toggle Button (Top Right) */}
				<button
					onClick={toggleMute}
					className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 flex items-center justify-center transition-all duration-200 active:scale-95"
				>
					{isMuted ? (
						// Muted Icon
						<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
							<path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
						</svg>
					) : (
						// Unmuted Icon
						<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
						</svg>
					)}
				</button>

				{/* Video Overlay (Bottom) */}
				<div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-6 px-6">
					{/* Source Badge */}
					<div className="mb-3">
						<span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
							{video.source}
						</span>
					</div>

					{/* Title */}
					<h2 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-lg mb-2">
						{video.title}
					</h2>

					{/* Published Time */}
					<p className="text-sm text-gray-300 drop-shadow-md">
						{video.publishedAt}
					</p>
				</div>

				{/* Action Buttons (Right Side) */}
				<div className="absolute right-4 md:right-6 bottom-24 flex flex-col gap-5 z-20">
					{/* Like Button */}
					<button
						onClick={handleLike}
						className="flex flex-col items-center gap-1.5 group"
					>
						<div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${
							isLiked
								? 'bg-red-500 text-white'
								: 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
						}`}>
							<svg
								className="w-5 h-5"
								fill={isLiked ? 'currentColor' : 'none'}
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</div>
						<span className="text-xs text-white font-medium drop-shadow-lg">
							{isLiked ? '좋아요' : '좋아요'}
						</span>
					</button>

					{/* Bookmark Button */}
					<button
						onClick={handleBookmark}
						className="flex flex-col items-center gap-1.5 group"
					>
						<div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${
							isBookmarkedVideo
								? 'bg-yellow-500 text-white'
								: 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
						}`}>
							<svg
								className="w-5 h-5"
								fill={isBookmarkedVideo ? 'currentColor' : 'none'}
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
								/>
							</svg>
						</div>
						<span className="text-xs text-white font-medium drop-shadow-lg">
							{isBookmarkedVideo ? '저장됨' : '저장'}
						</span>
					</button>

					{/* Share Button */}
					<button
						onClick={handleShare}
						className="flex flex-col items-center gap-1.5 group"
					>
						<div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 flex items-center justify-center transition-all duration-200 active:scale-95">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
								/>
							</svg>
						</div>
						<span className="text-xs text-white font-medium drop-shadow-lg">
							공유
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
