import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SnapCoverView from '../components/article-viewer/SnapCoverView.jsx';
import NewsSnapView from '../components/article-viewer/NewsSnapView.jsx';
import SocialActionsBar from '../components/article-viewer/SocialActionsBar.jsx';
import ViewModeToggle from '../components/article-viewer/ViewModeToggle.jsx';

// 목업 데이터
const MOCK_ARTICLES = [
	{
		title: '테슬라, 2025년 신형 전기차 출시 예정',
		description: '테슬라가 2025년 새로운 전기차 모델 라인업을 공개할 예정입니다.\n\n이번 신형 모델은 더 긴 주행거리와 향상된 자율주행 기능을 갖추고 있습니다.\n\n업계 전문가들은 이번 출시가 전기차 시장에 큰 영향을 미칠 것으로 전망하고 있습니다.',
		url: 'https://example.com/article-1',
		urlToImage: 'https://via.placeholder.com/800x600/FF7A00/white?text=Tesla+News',
		publishedAt: '2025-12-05T10:00:00Z',
		source: { name: 'TechCrunch' }
	},
	{
		title: 'AI 기술, 의료 분야에 혁신을 가져오다',
		description: '인공지능 기술이 의료 진단의 정확도를 크게 향상시키고 있습니다.\n\nAI 기반 진단 시스템은 95% 이상의 정확도를 보이며, 의료진의 업무 효율을 높이고 있습니다.\n\n전문가들은 향후 5년 내 AI가 의료 분야의 핵심 도구가 될 것으로 예상합니다.',
		url: 'https://example.com/article-2',
		urlToImage: 'https://via.placeholder.com/800x600/1B2B4A/white?text=AI+Healthcare',
		publishedAt: '2025-12-05T09:00:00Z',
		source: { name: 'The Verge' }
	},
	{
		title: '글로벌 기후 회의, 탄소 중립 목표 합의',
		description: '주요 국가들이 2050년까지 탄소 중립을 달성하기로 합의했습니다.\n\n이번 합의는 기후 변화 대응을 위한 중요한 이정표가 될 것으로 평가됩니다.\n\n각국은 재생에너지 투자 확대와 화석연료 사용 감축을 약속했습니다.',
		url: 'https://example.com/article-3',
		urlToImage: 'https://via.placeholder.com/800x600/22C55E/white?text=Climate+Summit',
		publishedAt: '2025-12-05T08:00:00Z',
		source: { name: 'BBC News' }
	}
];

export default function ArticleViewer() {
	const [articles] = useState(MOCK_ARTICLES);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [viewMode, setViewMode] = useState('cover'); // 'cover' | 'news'
	const [likedArticles, setLikedArticles] = useState(new Set());
	const [dislikedArticles, setDislikedArticles] = useState(new Set());

	const containerRef = useRef(null);
	const navigate = useNavigate();

	// Scroll Handling (Shorts.jsx 패턴)
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
	}, []);

	// 좋아요 핸들러
	const handleLike = () => {
		const currentArticleId = articles[currentIndex]?.url;
		if (!currentArticleId) return;

		setLikedArticles((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(currentArticleId)) {
				newSet.delete(currentArticleId);
			} else {
				newSet.add(currentArticleId);
				setDislikedArticles((prevDislike) => {
					const newDislikeSet = new Set(prevDislike);
					newDislikeSet.delete(currentArticleId);
					return newDislikeSet;
				});
			}
			return newSet;
		});
	};

	// 싫어요 핸들러
	const handleDislike = () => {
		const currentArticleId = articles[currentIndex]?.url;
		if (!currentArticleId) return;

		setDislikedArticles((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(currentArticleId)) {
				newSet.delete(currentArticleId);
			} else {
				newSet.add(currentArticleId);
				setLikedArticles((prevLike) => {
					const newLikeSet = new Set(prevLike);
					newLikeSet.delete(currentArticleId);
					return newLikeSet;
				});
			}
			return newSet;
		});
	};

	// 댓글 핸들러
	const handleComment = () => {
		alert('댓글 기능은 추후 구현 예정입니다.');
	};

	return (
		<div className="h-screen w-full overflow-hidden bg-black relative animate-toss-scale">
			{/* Snap Scroll Container */}
			<div
				ref={containerRef}
				className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{articles.map((article, index) => (
					<div
						key={article.url}
						className="h-screen snap-start snap-always relative animate-mode-transition"
					>
						{viewMode === 'cover' ? (
							<SnapCoverView article={article} />
						) : (
							<NewsSnapView article={article} />
						)}
					</div>
				))}
			</div>

			{/* SocialActionsBar (우측 중단) */}
			<SocialActionsBar
				articleId={articles[currentIndex]?.url}
				isLiked={likedArticles.has(articles[currentIndex]?.url)}
				isDisliked={dislikedArticles.has(articles[currentIndex]?.url)}
				onLike={handleLike}
				onDislike={handleDislike}
				onComment={handleComment}
			/>

			{/* ViewModeToggle (하단 중앙) */}
			<ViewModeToggle
				currentMode={viewMode}
				onToggle={() => setViewMode((prev) => (prev === 'cover' ? 'news' : 'cover'))}
				articleUrl={articles[currentIndex]?.url}
			/>

			{/* BackButton (좌측 상단) */}
			<button
				onClick={() => navigate(-1)}
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
