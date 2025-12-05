import React from 'react';

export default function MascotLoader({ size = 'md', message = '로딩 중...' }) {
	const sizeClasses = {
		sm: 'w-16 h-16',
		md: 'w-24 h-24',
		lg: 'w-32 h-32'
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			{/* Character Image with Animation */}
			<div className={`${sizeClasses[size]} relative`}>
				<img
					src="/character.png"
					alt="Character"
					className="w-full h-full object-contain animate-bounce"
					onError={(e) => {
						// Fallback to placeholder if image fails to load
						e.target.style.display = 'none';
						const placeholder = document.createElement('div');
						placeholder.className = 'w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl';
						placeholder.textContent = '🎮';
						e.target.parentElement.appendChild(placeholder);
					}}
				/>
			</div>

			{/* Loading Message */}
			{message && (
				<p className="text-sm font-medium text-gray-600 animate-pulse">
					{message}
				</p>
			)}
		</div>
	);
}

