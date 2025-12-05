import React from 'react';

export default function DailyQuest({ quest, isCompleted = false }) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-5 hover:shadow-md transition-all duration-200">
			<div className="flex items-start gap-4">
				{/* Checkbox or Progress Icon */}
				<div className="flex-shrink-0 mt-0.5">
					{isCompleted ? (
						<div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={3}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
					) : (
						<div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
							<div className="w-3 h-3 rounded-full bg-gray-300"></div>
						</div>
					)}
				</div>

				{/* Quest Content */}
				<div className="flex-1 min-w-0">
					<h3 className={`text-base font-semibold mb-1 ${
						isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
					}`}>
						{quest.title}
					</h3>
					{quest.description && (
						<p className="text-sm text-gray-600 mb-3">
							{quest.description}
						</p>
					)}
				</div>

				{/* XP Reward Badge */}
				<div className="flex-shrink-0">
					<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
						+{quest.xpReward} XP
					</span>
				</div>
			</div>
		</div>
	);
}


