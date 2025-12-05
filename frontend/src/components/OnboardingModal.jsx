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
		snippet: 'Major technology companies join forces to develop next-generation AI solutions for global markets.'
	},
	{
		id: 2,
		title: 'Climate Summit Reaches Historic Agreement',
		source: 'Environmental Times',
		snippet: 'World leaders commit to ambitious carbon reduction targets in unprecedented climate action plan.'
	},
	{
		id: 3,
		title: 'Space Exploration Milestone Achieved',
		source: 'Science Daily',
		snippet: 'New mission successfully lands on distant planet, opening possibilities for future colonization.'
	},
	{
		id: 4,
		title: 'Economic Markets Show Strong Recovery',
		source: 'Financial Review',
		snippet: 'Global markets surge as economic indicators point to sustained growth and stability.'
	},
	{
		id: 5,
		title: 'Breakthrough in Medical Research',
		source: 'Health Journal',
		snippet: 'Scientists discover potential treatment for previously incurable disease, offering hope to millions.'
	},
	{
		id: 6,
		title: 'Sports Championship Breaks Viewing Records',
		source: 'Sports Network',
		snippet: 'Historic final match attracts record-breaking global audience, setting new entertainment benchmarks.'
	},
	{
		id: 7,
		title: 'Renewable Energy Adoption Accelerates',
		source: 'Green Energy News',
		snippet: 'Countries worldwide accelerate transition to renewable energy sources, exceeding previous projections.'
	},
	{
		id: 8,
		title: 'Cultural Festival Celebrates Global Diversity',
		source: 'Culture Today',
		snippet: 'International festival brings together artists and performers from over 100 countries worldwide.'
	},
	{
		id: 9,
		title: 'Education Technology Transforms Learning',
		source: 'Education Weekly',
		snippet: 'New digital platforms revolutionize how students learn, making education more accessible globally.'
	},
	{
		id: 10,
		title: 'Food Security Initiative Launched',
		source: 'Global Food Network',
		snippet: 'International coalition launches comprehensive program to address food insecurity in developing regions.'
	},
	{
		id: 11,
		title: 'Entertainment Industry Embraces Innovation',
		source: 'Entertainment Hub',
		snippet: 'Streaming platforms and studios collaborate on groundbreaking content creation technologies.'
	},
	{
		id: 12,
		title: 'Transportation Revolution Begins',
		source: 'Transport News',
		snippet: 'Electric and autonomous vehicles reshape urban mobility, reducing emissions and improving safety.'
	},
	{
		id: 13,
		title: 'Social Media Platform Introduces Privacy Features',
		source: 'Digital Life',
		snippet: 'Major platform rolls out enhanced privacy controls, giving users more control over their data.'
	},
	{
		id: 14,
		title: 'Art Exhibition Showcases Contemporary Works',
		source: 'Arts & Culture',
		snippet: 'Prestigious gallery opens exhibition featuring cutting-edge contemporary artists from around the world.'
	},
	{
		id: 15,
		title: 'Scientific Discovery Changes Understanding',
		source: 'Research Today',
		snippet: 'Groundbreaking research challenges long-held scientific theories, opening new research directions.'
	},
	{
		id: 16,
		title: 'Business Innovation Drives Economic Growth',
		source: 'Business Weekly',
		snippet: 'Startups and established companies drive innovation, creating new jobs and economic opportunities.'
	},
	{
		id: 17,
		title: 'Healthcare System Improvements Announced',
		source: 'Health News',
		snippet: 'Government announces comprehensive healthcare reforms aimed at improving access and quality.'
	},
	{
		id: 18,
		title: 'Tourism Industry Sees Record Numbers',
		source: 'Travel Magazine',
		snippet: 'Global tourism reaches all-time high as travelers explore new destinations and experiences.'
	},
	{
		id: 19,
		title: 'Gaming Industry Breaks Revenue Records',
		source: 'Gaming World',
		snippet: 'Video game industry achieves unprecedented growth, becoming one of the largest entertainment sectors.'
	},
	{
		id: 20,
		title: 'Social Justice Movement Gains Momentum',
		source: 'Society Today',
		snippet: 'Grassroots movements worldwide advocate for equality and justice, driving meaningful change.'
	}
];

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

	const handleSkip = () => {
		closeOnboardingModal();
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
						className="text-gray-400 hover:text-gray-600 transition-colors p-1"
						title="닫기"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Card Stack Container */}
				<div className="relative flex-1 p-4 overflow-hidden">
					{MOCK_ARTICLES.map((article, index) => (
						<TinderCard
							ref={childRefs.current[index]}
							key={article.id}
							onSwipe={(dir) => swiped(dir, article.id, index)}
							onCardLeftScreen={() => outOfFrame(article.title, index)}
							preventSwipe={['up', 'down']}
							className="absolute w-full h-full"
						>
							<div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col cursor-grab active:cursor-grabbing border border-gray-100">
								{/* Card Content */}
								<div className="flex-1 flex flex-col">
									{/* Source Badge */}
									<div className="mb-4">
										<span className="inline-block px-4 py-2 text-sm font-medium text-primary-500 bg-primary-50 rounded-full">
											{article.source}
										</span>
									</div>

									{/* Title */}
									<h2 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-3 leading-tight">
										{article.title}
									</h2>

									{/* Snippet */}
									<p className="text-base text-gray-600 leading-relaxed flex-1">
										{article.snippet}
									</p>
								</div>

								{/* Swipe Hints */}
								<div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
									<div className="flex items-center gap-2">
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
										<span>관심없음</span>
									</div>
									<div className="flex items-center gap-2">
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
										<span>관심있음</span>
									</div>
								</div>
							</div>
						</TinderCard>
					))}
				</div>

				{/* Action Buttons */}
				<div className="flex items-center justify-center gap-4 p-4 border-t border-gray-200 flex-shrink-0">
					<button
						onClick={() => swipe('left')}
						disabled={!canSwipe}
						className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<button
						onClick={goBack}
						disabled={!canGoBack}
						className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
					</button>

					<button
						onClick={() => swipe('right')}
						disabled={!canSwipe}
						className="w-12 h-12 rounded-full bg-white border-2 border-primary-200 shadow-sm flex items-center justify-center hover:bg-primary-50 transition-all ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
					>
						<svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
						</svg>
					</button>

					<button
						onClick={handleSkip}
						className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all ease-in-out duration-150 hover:bg-gray-100 rounded-lg active:scale-95"
					>
						건너뛰기
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
