import React from 'react';

export default function SocialActionsBar({
	articleId,
	isLiked,
	isDisliked,
	onLike,
	onDislike,
	onComment
}) {
	return (
		<div className="absolute right-4 md:right-8 bottom-32 flex flex-col gap-6 z-20">
			{/* 좋아요 버튼 */}
			<button onClick={onLike} className="flex flex-col items-center gap-2 group">
				<div
					className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
						isLiked
							? 'bg-red-500 text-white'
							: 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
					}`}
				>
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
				<span className="text-xs text-white font-medium drop-shadow-lg">좋아요</span>
			</button>

			{/* 싫어요 버튼 */}
			<button onClick={onDislike} className="flex flex-col items-center gap-2 group">
				<div
					className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
						isDisliked
							? 'bg-gray-700 text-white'
							: 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
					}`}
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
							d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
						/>
					</svg>
				</div>
				<span className="text-xs text-white font-medium drop-shadow-lg">싫어요</span>
			</button>

			{/* 댓글 버튼 */}
			<button onClick={onComment} className="flex flex-col items-center gap-2 group">
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
							d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
						/>
					</svg>
				</div>
				<span className="text-xs text-white font-medium drop-shadow-lg">댓글</span>
			</button>
		</div>
	);
}
