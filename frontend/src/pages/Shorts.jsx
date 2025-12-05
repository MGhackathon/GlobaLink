import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../api/newsAPI.js';
import { useBookmark } from '../contexts/BookmarkContext.jsx';
import { translateText } from '../api/translateAPI.js';

// TTS placeholder function
const playTTS = (text) => {
	// Placeholder for TTS functionality
	console.log('TTS would play:', text);
	// TODO: Implement TTS using Web Speech API or external service
};

export default function Shorts() {
	const [shorts, setShorts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedShorts, setLikedShorts] = useState(new Set());
	const containerRef = useRef(null);
	const navigate = useNavigate();
	const { toggleBookmark, isBookmarked } = useBookmark();

	// Load news articles and convert to shorts
	useEffect(() => {
		const loadShorts = async () => {
			setLoading(true);
			try {
				// Fetch news from multiple countries for variety
				const [usNews, inNews, cnNews] = await Promise.all([
					fetchNews({ countryCode: 'US' }),
					fetchNews({ countryCode: 'IN' }),
					fetchNews({ countryCode: 'CN' })
				]);

				// Combine and shuffle articles
				const allArticles = [...usNews, ...inNews, ...cnNews]
					.filter(article => article.title && article.description)
					.slice(0, 20); // Limit to 20 shorts

				// Convert articles to shorts format
				const shortsData = await Promise.all(
					allArticles.map(async (article) => {
						// Translate title and description for summary
						let translatedTitle = article.title;
						let translatedDescription = article.description;

						try {
							translatedTitle = await translateText(article.title);
							// Use first sentence of description as summary
							const firstSentence = article.description.split('.')[0];
							translatedDescription = await translateText(firstSentence);
						} catch (error) {
							console.error('Translation error:', error);
						}

						return {
							id: article.url || `${article.title}-${Date.now()}`,
							title: translatedTitle,
							summary: translatedDescription || article.description?.split('.')[0] || '뉴스 요약',
							image: article.urlToImage || null,
							source: article.source?.name || article.source || 'Unknown',
							url: article.url,
							publishedAt: article.publishedAt
						};
					})
				);

				setShorts(shortsData);
			} catch (error) {
				console.error('Error loading shorts:', error);
			} finally {
				setLoading(false);
			}
		};

		loadShorts();
	}, []);

	// Handle scroll snap
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const scrollTop = container.scrollTop;
			const itemHeight = window.innerHeight;
			const newIndex = Math.round(scrollTop / itemHeight);
			setCurrentIndex(newIndex);

			// Auto-play TTS for current short (placeholder)
			if (shorts[newIndex]) {
				playTTS(shorts[newIndex].summary);
			}
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, [shorts]);

	// Handle like
	const handleLike = (shortId) => {
		setLikedShorts(prev => {
			const newSet = new Set(prev);
			if (newSet.has(shortId)) {
				newSet.delete(shortId);
			} else {
				newSet.add(shortId);
			}
			return newSet;
		});
	};

	// Handle scrap (bookmark)
	const handleScrap = (short) => {
		const articleId = short.id;
		const articleData = {
			id: articleId,
			title: short.title,
			description: short.summary,
			source: short.source,
			url: short.url,
			urlToImage: short.image,
			publishedAt: short.publishedAt
		};
		toggleBookmark(articleId, articleData);
	};

	// Handle share
	const handleShare = async (short) => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: short.title,
					text: short.summary,
					url: short.url || window.location.href
				});
			} catch (error) {
				console.error('Error sharing:', error);
			}
		} else {
			// Fallback: copy to clipboard
			const text = `${short.title}\n${short.summary}\n${short.url || ''}`;
			await navigator.clipboard.writeText(text);
			alert('링크가 클립보드에 복사되었습니다!');
		}
	};

	if (loading) {
		return (
			<div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<div className="text-center">
					<div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
					<p className="text-white text-lg font-medium">Shorts를 불러오는 중...</p>
				</div>
			</div>
		);
	}

	if (shorts.length === 0) {
		return (
			<div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<div className="text-center">
					<p className="text-white text-lg font-medium">Shorts를 불러올 수 없습니다</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen overflow-hidden bg-black">
			{/* Container with snap scrolling */}
			<div
				ref={containerRef}
				className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{shorts.map((short, index) => {
					const isLiked = likedShorts.has(short.id);
					const isScrapped = isBookmarked(short.id);

					return (
						<div
							key={short.id}
							className="h-screen snap-start snap-always relative flex items-center justify-center"
						>
							{/* Background Image with Gradient Overlay */}
							<div className="absolute inset-0">
								{short.image ? (
									<>
										<img
											src={short.image}
											alt={short.title}
											className="w-full h-full object-cover"
											onError={(e) => {
												e.target.style.display = 'none';
											}}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
									</>
								) : (
									<div className="w-full h-full bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600"></div>
								)}
							</div>

							{/* Content */}
							<div className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-white">
								{/* Source Badge */}
								<div className="mb-4">
									<span className="inline-block px-4 py-1.5 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
										{short.source}
									</span>
								</div>

								{/* Title */}
								<h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight drop-shadow-lg">
									{short.title}
								</h2>

								{/* Summary */}
								<p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 drop-shadow-md">
									{short.summary}
								</p>

								{/* Read More Button */}
								{short.url && (
									<button
										onClick={() => window.open(short.url, '_blank')}
										className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-semibold transition-all duration-200 border border-white/30 hover:border-white/50"
									>
										전체 기사 보기 →
									</button>
								)}
							</div>

							{/* Action Buttons (Right Side) */}
							<div className="absolute right-4 md:right-8 bottom-24 flex flex-col gap-6 z-20">
								{/* Like Button */}
								<button
									onClick={() => handleLike(short.id)}
									className="flex flex-col items-center gap-2 group"
								>
									<div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
										isLiked
											? 'bg-red-500 text-white'
											: 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
									}`}>
										<svg
											className="w-6 h-6"
											fill={isLiked ? 'currentColor' : 'none'}
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
									</div>
									<span className="text-xs text-white font-medium drop-shadow-lg">
										{isLiked ? '좋아요' : '좋아요'}
									</span>
								</button>

								{/* Scrap Button */}
								<button
									onClick={() => handleScrap(short)}
									className="flex flex-col items-center gap-2 group"
								>
									<div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
										isScrapped
											? 'bg-yellow-500 text-white'
											: 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
									}`}>
										<svg
											className="w-6 h-6"
											fill={isScrapped ? 'currentColor' : 'none'}
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
											/>
										</svg>
									</div>
									<span className="text-xs text-white font-medium drop-shadow-lg">
										{isScrapped ? '스크랩됨' : '스크랩'}
									</span>
								</button>

								{/* Share Button */}
								<button
									onClick={() => handleShare(short)}
									className="flex flex-col items-center gap-2 group"
								>
									<div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 flex items-center justify-center transition-all duration-200">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
											/>
										</svg>
									</div>
									<span className="text-xs text-white font-medium drop-shadow-lg">
										공유
									</span>
								</button>
							</div>

							{/* Progress Indicator (Bottom) */}
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
								<div className="flex gap-1.5">
									{shorts.map((_, idx) => (
										<div
											key={idx}
											className={`h-1 rounded-full transition-all duration-300 ${
												idx === index
													? 'w-8 bg-white'
													: 'w-1 bg-white/40'
											}`}
										/>
									))}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Back Button */}
			<button
				onClick={() => navigate('/')}
				className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 flex items-center justify-center transition-all duration-200"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
			</button>
		</div>
	);
}

