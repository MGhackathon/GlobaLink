import React from 'react';

export default function XPProgressBar({ currentXP = 0, maxXP = 100, level = 1 }) {
	const percentage = Math.min((currentXP / maxXP) * 100, 100);

	return (
		<div className="w-full">
			{/* Level and XP Info */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-2">
					<span className="text-sm font-semibold text-gray-700">Level {level}</span>
					<span className="text-xs text-gray-500">•</span>
					<span className="text-sm text-gray-600">{currentXP} / {maxXP} XP</span>
				</div>
				<span className="text-xs text-gray-500">
					{maxXP - currentXP} XP until Level {level + 1}
				</span>
			</div>

			{/* Progress Bar */}
			<div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
				<div
					className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out relative"
					style={{ width: `${percentage}%` }}
				>
					{/* Shine effect */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
				</div>
			</div>
		</div>
	);
}


