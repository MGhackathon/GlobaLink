import React, { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useOnboarding } from '../contexts/OnboardingContext.jsx';

// Mock news articles data (기존 OnboardingSwipe와 동일)
const MOCK_ARTICLES = [
	{
		id: 1,
		title: 'Global Tech Giants Announce New AI Partnership',
		source: 'Tech News',
		snippet: 'Major technology companies join forces to develop next-generation AI solutions.',
		category: 'technology'
	},
	{
		id: 2,
		title: 'Climate Summit Reaches Historic Agreement',
		source: 'Environmental Times',
		snippet: 'World leaders commit to ambitious carbon reduction targets.',
		category: 'science'
	},
	{
		id: 3,
		title: 'Space Exploration Milestone Achieved',
		source: 'Science Daily',
		snippet: 'New mission successfully lands on distant planet, opening possibilities.',
		category: 'science'
	},
	{
		id: 4,
		title: 'Economic Markets Show Strong Recovery',
		source: 'Financial Review',
		snippet: 'Global markets surge as economic indicators point to sustained growth.',
		category: 'business'
	},
	{
		id: 5,
		title: 'Breakthrough in Medical Research',
		source: 'Health Journal',
		snippet: 'Scientists discover potential treatment for previously incurable disease.',
		category: 'health'
	},
	{
		id: 6,
		title: 'Sports Championship Breaks Viewing Records',
		source: 'Sports Network',
		snippet: 'Historic final match attracts record-breaking global audience.',
		category: 'sports'
	},
	{
		id: 7,
		title: 'Renewable Energy Adoption Accelerates',
		source: 'Green Energy News',
		snippet: 'Countries worldwide accelerate transition to renewable energy sources.',
		category: 'science'
	},
	{
		id: 8,
		title: 'Cultural Festival Celebrates Global Diversity',
		source: 'Culture Today',
		snippet: 'International festival brings together artists from over 100 countries.',
		category: 'entertainment'
	},
	{
		id: 9,
		title: 'Education Technology Transforms Learning',
		source: 'Education Weekly',
		snippet: 'New digital platforms revolutionize how students learn globally.',
		category: 'technology'
	},
	{
		id: 10,
		title: 'Food Security Initiative Launched',
		source: 'Global Food Network',
		snippet: 'International coalition launches program to address food insecurity.',
		category: 'general'
	},
	{
		id: 11,
		title: 'Entertainment Industry Embraces Innovation',
		source: 'Entertainment Hub',
		snippet: 'Streaming platforms collaborate on groundbreaking content technologies.',
		category: 'entertainment'
	},
	{
		id: 12,
		title: 'Transportation Revolution Begins',
		source: 'Transport News',
		snippet: 'Electric and autonomous vehicles reshape urban mobility.',
		category: 'technology'
	},
	{
		id: 13,
		title: 'Social Media Platform Introduces Privacy Features',
		source: 'Digital Life',
		snippet: 'Major platform rolls out enhanced privacy controls for users.',
		category: 'technology'
	},
	{
		id: 14,
		title: 'Art Exhibition Showcases Contemporary Works',
		source: 'Arts & Culture',
		snippet: 'Prestigious gallery opens exhibition featuring contemporary artists.',
		category: 'entertainment'
	},
	{
		id: 15,
		title: 'Scientific Discovery Changes Understanding',
		source: 'Research Today',
		snippet: 'Groundbreaking research challenges long-held scientific theories.',
		category: 'science'
	},
	{
		id: 16,
		title: 'Business Innovation Drives Economic Growth',
		source: 'Business Weekly',
		snippet: 'Startups and companies drive innovation, creating new jobs.',
		category: 'business'
	},
	{
		id: 17,
		title: 'Healthcare System Improvements Announced',
		source: 'Health News',
		snippet: 'Government announces comprehensive healthcare reforms.',
		category: 'health'
	},
	{
		id: 18,
		title: 'Tourism Industry Sees Record Numbers',
		source: 'Travel Magazine',
		snippet: 'Global tourism reaches all-time high as travelers explore.',
		category: 'general'
	},
	{
		id: 19,
		title: 'Gaming Industry Breaks Revenue Records',
		source: 'Gaming World',
		snippet: 'Video game industry achieves unprecedented growth.',
		category: 'entertainment'
	},
	{
		id: 20,
		title: 'Social Justice Movement Gains Momentum',
		source: 'Society Today',
		snippet: 'Grassroots movements worldwide advocate for equality and justice.',
		category: 'general'
	}
];

// Category color utility function
const getCategoryColor = (category) => {
	const colors = {
		technology: 'bg-cyan-100 text-cyan-800 border border-cyan-200',
		business: 'bg-blue-100 text-blue-800 border border-blue-200',
		entertainment: 'bg-purple-100 text-purple-800 border border-purple-200',
		health: 'bg-green-100 text-green-800 border border-green-200',
		science: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
		sports: 'bg-orange-100 text-orange-800 border border-orange-200',
		general: 'bg-gray-100 text-gray-800 border border-gray-200'
	};
	return colors[category] || colors.general;
};

export default function OnboardingModal() {
	const { showOnboardingModal, closeOnboardingModal } = useAuth();
	const { addInterest } = useOnboarding();
	const [currentIndex, setCurrentIndex] = useState(MOCK_ARTICLES.length - 1);
	const currentIndexRef = useRef(currentIndex);
	const [swipeDirection, setSwipeDirection] = useState(null); // 'left' | 'right' | null

	const childRefs = useRef(
		Array(MOCK_ARTICLES.length)
			.fill(0)
			.map(() => ({ current: null }))
	);

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canGoBack = currentIndex < MOCK_ARTICLES.length - 1;
	const canSwipe = currentIndex >= 0;

	const swiped = (direction, articleId, index) => {
		updateCurrentIndex(index - 1);

		// Save interest (기존 OnboardingContext 활용)
		if (direction === 'right') {
			addInterest(articleId, true);
		} else if (direction === 'left') {
			addInterest(articleId, false);
		}

		// 상태 초기화
		setSwipeDirection(null);

		// Check if all cards are swiped
		if (index === 0) {
			// All cards swiped, close modal
			setTimeout(() => {
				closeOnboardingModal();
			}, 500);
		}
	};

	const handleSwipeRequirementFulfilled = (direction) => {
		setSwipeDirection(direction);

		// 햅틱 피드백
		if ('vibrate' in navigator) {
			navigator.vibrate(50);
		}
	};

	const handleSwipeRequirementUnfulfilled = () => {
		setSwipeDirection(null);
	};

	// 마우스/터치 종료 시 상태 초기화
	const handlePointerUp = () => {
		// 즉시 초기화 - onSwipeRequirementUnfulfilled가 이미 호출되므로 딜레이 불필요
		setSwipeDirection(null);
	};

	const outOfFrame = (name, idx) => {
		currentIndexRef.current >= idx && childRefs.current[idx].current?.restoreCard();
	};

	const swipe = async (dir) => {
		if (canSwipe && currentIndex < MOCK_ARTICLES.length) {
			await childRefs.current[currentIndex].current?.swipe(dir);
		}
	};

	const goBack = async () => {
		if (!canGoBack) return;
		const newIndex = currentIndex + 1;
		updateCurrentIndex(newIndex);
		await childRefs.current[newIndex].current?.restoreCard();
	};

	const handleClose = () => {
		closeOnboardingModal();
	};

	if (!showOnboardingModal) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[90vh] flex flex-col overflow-hidden animate-toss-scale">
				{/* Header with Close Button */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
					<h2 className="text-lg font-semibold text-gray-900">
						관심있는 뉴스를 선택해주세요
					</h2>
					<button
						onClick={handleClose}
						className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-lg active:scale-95"
						title="닫기"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Card Stack Container */}
				<div className="relative flex-1 flex items-center justify-center py-10 px-12">
					{/* 되돌리기 버튼 - 좌상단 */}
					<button
						onClick={goBack}
						disabled={!canGoBack}
						className="absolute top-4 left-4 z-50 w-11 h-11 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9" />
						</svg>
					</button>

					{/* 배경 X 힌트 (왼쪽) */}
					<div
						className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-all duration-400"
						style={{
							opacity: swipeDirection === 'left' ? 1 : 0.15,
							transform: `translateY(-50%) scale(${swipeDirection === 'left' ? 1.15 : 1})`,
							transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
							zIndex: 1
						}}
					>
						<div className={`p-4 rounded-full ${swipeDirection === 'left' ? 'bg-red-500 shadow-xl' : 'bg-gray-300'} transition-all duration-400`}>
							<svg className={`w-8 h-8 ${swipeDirection === 'left' ? 'text-white' : 'text-gray-500'} transition-colors duration-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
					</div>

					{/* 배경 하트 힌트 (오른쪽) */}
					<div
						className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-all duration-400"
						style={{
							opacity: swipeDirection === 'right' ? 1 : 0.15,
							transform: `translateY(-50%) scale(${swipeDirection === 'right' ? 1.15 : 1})`,
							transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
							zIndex: 1
						}}
					>
						<div className={`p-4 rounded-full ${swipeDirection === 'right' ? 'bg-primary-500 shadow-xl' : 'bg-gray-300'} transition-all duration-400`}>
							<svg className={`w-8 h-8 ${swipeDirection === 'right' ? 'text-white' : 'text-gray-500'} transition-colors duration-400`} fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
							</svg>
						</div>
					</div>

					{MOCK_ARTICLES.map((article, index) => {
						const isVisible = index >= currentIndex - 2 && index <= currentIndex;
						const position = currentIndex - index;

						if (!isVisible) return null;

						// 뒤쪽 카드들을 좌우로 살짝 어긋나게 배치
						const rotateAngle = position === 1 ? -4 : position === 2 ? 4 : 0;
						const translateX = position === 1 ? -15 : position === 2 ? 15 : 0;

						return (
							<TinderCard
								ref={childRefs.current[index]}
								key={article.id}
								onSwipe={(dir) => swiped(dir, article.id, index)}
								onCardLeftScreen={() => outOfFrame(article.title, index)}
								onSwipeRequirementFulfilled={handleSwipeRequirementFulfilled}
								onSwipeRequirementUnfulfilled={handleSwipeRequirementUnfulfilled}
								swipeRequirementType="position"
								swipeThreshold={80}
								preventSwipe={['up', 'down']}
								className="absolute"
								style={{
									zIndex: MOCK_ARTICLES.length - index,
									pointerEvents: index === currentIndex ? 'auto' : 'none'
								}}
							>
								<div
									className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col cursor-grab active:cursor-grabbing relative select-none"
									style={{
										width: '320px',
										height: '440px',
										transform: `scale(${1 - position * 0.04}) translateY(${position * 15}px) translateX(${translateX}px) rotate(${rotateAngle}deg)`,
										transition: index === currentIndex
											? 'none'
											: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease-out',
										opacity: position === 0 ? 1 : 0.75 - position * 0.1,
										willChange: index === currentIndex ? 'transform, opacity' : 'auto',
										userSelect: 'none',
										WebkitUserDrag: 'none',
										touchAction: 'none'
									}}
								>
								{/* 배경 틴트 오버레이 */}
								<div
									className="absolute inset-0 pointer-events-none transition-all duration-300 rounded-xl z-0"
									style={{
										background: swipeDirection === 'left'
											? 'linear-gradient(to right, rgba(239, 68, 68, 0.15), transparent)'
											: swipeDirection === 'right'
											? 'linear-gradient(to left, rgba(255, 122, 0, 0.15), transparent)'
											: 'transparent'
									}}
								/>
								{/* 이미지 영역 - 스켈레톤만 */}
								<div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
									{/* 이미지 아이콘 */}
									<div className="w-full h-full flex items-center justify-center">
										<svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>

									{/* 그라디언트 오버레이 */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

									{/* Source Badge (왼쪽 상단) */}
									<div className="absolute top-2 left-2 px-3 py-1.5 text-xs font-medium text-primary-500 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
										📰 {article.source}
									</div>
								</div>

								{/* 콘텐츠 영역 */}
								<div className="p-6 flex flex-col flex-1">
									{/* 제목 */}
									<h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-3 leading-tight">
										{article.title}
									</h3>

									{/* 요약 (1~2줄) */}
									<p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-1">
										{article.snippet}
									</p>

									{/* 카테고리 태그 */}
									{article.category && (
										<div className="mb-4">
											<span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
												{article.category}
											</span>
										</div>
									)}
								</div>
							</div>
						</TinderCard>
						);
					})}
				</div>

				{/* Progress Indicator */}
				<div className="px-4 pb-4 flex-shrink-0">
					<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
						<div
							className="h-full bg-primary-500 transition-all duration-300 ease-out"
							style={{ width: `${((MOCK_ARTICLES.length - currentIndex - 1) / MOCK_ARTICLES.length) * 100}%` }}
						/>
					</div>
					<p className="text-xs text-center text-gray-500 mt-2">
						{currentIndex + 1} / {MOCK_ARTICLES.length}
					</p>
				</div>
			</div>
		</div>
	);
}
