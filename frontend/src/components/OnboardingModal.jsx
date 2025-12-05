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

		// Check if all cards are swiped
		if (index === 0) {
			// All cards swiped, close modal
			setTimeout(() => {
				closeOnboardingModal();
			}, 500);
		}
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

	const handlePass = async () => {
		if (canSwipe && currentIndex >= 0) {
			updateCurrentIndex(currentIndex - 1);
			// Pass는 관심사로 저장하지 않음
			if (currentIndex === 0) {
				setTimeout(() => {
					closeOnboardingModal();
				}, 500);
			}
		}
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
								preventSwipe={['up', 'down']}
								className="absolute"
								style={{
									zIndex: MOCK_ARTICLES.length - index,
									pointerEvents: index === currentIndex ? 'auto' : 'none'
								}}
							>
								<div
									className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col cursor-grab active:cursor-grabbing transition-all ease-in-out duration-200"
									style={{
										width: '280px',
										height: '400px',
										transform: `scale(${1 - position * 0.04}) translateY(${position * 15}px) translateX(${translateX}px) rotate(${rotateAngle}deg)`,
										transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
										opacity: position === 0 ? 1 : 0.75 - position * 0.1
									}}
								>
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

				{/* Action Buttons */}
				<div className="flex items-center justify-center gap-4 px-6 py-6 flex-shrink-0">
					{/* 관심없음 버튼 */}
					<button
						onClick={() => swipe('left')}
						disabled={!canSwipe}
						className="w-14 h-14 rounded-full bg-white border-2 border-red-200 shadow-md flex items-center justify-center hover:bg-red-50 hover:border-red-300 hover:scale-110 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					{/* Pass 버튼 */}
					<button
						onClick={handlePass}
						disabled={!canSwipe}
						className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 hover:scale-110 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
						</svg>
					</button>

					{/* 되돌리기 버튼 */}
					<button
						onClick={goBack}
						disabled={!canGoBack}
						className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 hover:scale-110 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
					</button>

					{/* 관심있음 버튼 */}
					<button
						onClick={() => swipe('right')}
						disabled={!canSwipe}
						className="w-14 h-14 rounded-full bg-white border-2 border-primary-200 shadow-md flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 hover:scale-110 transition-all ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
						</svg>
					</button>
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
