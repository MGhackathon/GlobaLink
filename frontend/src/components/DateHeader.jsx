import React from 'react';

export default function DateHeader() {
	// Get current date in "M월 D일의 TOP 10" format
	const getFormattedDate = () => {
		const today = new Date();
		const month = today.getMonth() + 1; // 0-indexed, so add 1
		const day = today.getDate();
		return `${month}월 ${day}일의 TOP 10`;
	};

	return (
		<div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
			<h1 className="text-white font-bold text-lg tracking-wide drop-shadow-lg">
				{getFormattedDate()}
			</h1>
		</div>
	);
}
