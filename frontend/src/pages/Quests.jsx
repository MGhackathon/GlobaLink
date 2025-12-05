import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import DailyQuest from '../components/DailyQuest.jsx';
import XPProgressBar from '../components/XPProgressBar.jsx';
import MascotLoader from '../components/MascotLoader.jsx';

// Placeholder quest data
const PLACEHOLDER_QUESTS = [
	{
		id: 1,
		title: '교육 키워드 포함 뉴스 읽기',
		description: '교육 관련 뉴스를 1개 이상 읽어보세요',
		xpReward: 10,
		isCompleted: false
	},
	{
		id: 2,
		title: 'AI 뉴스 1개 읽기',
		description: 'AI(인공지능) 관련 뉴스를 읽어보세요',
		xpReward: 10,
		isCompleted: false
	},
	{
		id: 3,
		title: '오늘의 퀴즈 풀기',
		description: '오늘의 퀴즈를 완료하고 보상을 받으세요',
		xpReward: 10,
		isCompleted: false
	}
];

export default function Quests() {
	const [quests, setQuests] = useState(PLACEHOLDER_QUESTS);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	// Placeholder XP data
	const currentXP = 45;
	const maxXP = 100;
	const level = 1;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation */}
			<Navigation onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-6 py-8 sm:px-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">일일 퀘스트</h1>
					<p className="text-gray-600">
						퀘스트를 완료하고 경험치를 획득하세요!
					</p>
				</div>

				{/* XP Progress Bar */}
				<div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
					<XPProgressBar
						currentXP={currentXP}
						maxXP={maxXP}
						level={level}
					/>
				</div>

				{/* Daily Quests */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">오늘의 퀘스트</h2>
					<div className="space-y-4">
						{quests.map((quest) => (
							<DailyQuest
								key={quest.id}
								quest={quest}
								isCompleted={quest.isCompleted}
							/>
						))}
					</div>
				</div>

				{/* Info Section */}
				<div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0">
							<svg
								className="w-6 h-6 text-primary-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-primary-900 mb-2">
								퀘스트 완료 방법
							</h3>
							<p className="text-sm text-primary-700">
								각 퀘스트를 완료하면 자동으로 경험치가 지급됩니다. 
								퀘스트는 매일 자정에 초기화됩니다.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}


