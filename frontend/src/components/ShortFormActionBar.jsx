import React, { useState, useEffect } from 'react';

export default function ShortFormActionBar({ articleId }) {
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);

	// localStorage에서 좋아요/싫어요 상태 불러오기
	useEffect(() => {
		if (!articleId) return;

		const likedArticles = JSON.parse(localStorage.getItem('likedShortForms') || '[]');
		const dislikedArticles = JSON.parse(localStorage.getItem('dislikedShortForms') || '[]');

		setIsLiked(likedArticles.includes(articleId));
		setIsDisliked(dislikedArticles.includes(articleId));
	}, [articleId]);

	// 좋아요 핸들러
	const handleLike = () => {
		if (!articleId) return;

		const likedArticles = JSON.parse(localStorage.getItem('likedShortForms') || '[]');
		const dislikedArticles = JSON.parse(localStorage.getItem('dislikedShortForms') || '[]');

		if (isLiked) {
			// 좋아요 취소
			const filtered = likedArticles.filter(id => id !== articleId);
			localStorage.setItem('likedShortForms', JSON.stringify(filtered));
			setIsLiked(false);
		} else {
			// 좋아요 추가
			likedArticles.push(articleId);
			localStorage.setItem('likedShortForms', JSON.stringify(likedArticles));
			setIsLiked(true);

			// 싫어요가 있었다면 제거
			if (isDisliked) {
				const filtered = dislikedArticles.filter(id => id !== articleId);
				localStorage.setItem('dislikedShortForms', JSON.stringify(filtered));
				setIsDisliked(false);
			}
		}
	};

	// 싫어요 핸들러
	const handleDislike = () => {
		if (!articleId) return;

		const likedArticles = JSON.parse(localStorage.getItem('likedShortForms') || '[]');
		const dislikedArticles = JSON.parse(localStorage.getItem('dislikedShortForms') || '[]');

		if (isDisliked) {
			// 싫어요 취소
			const filtered = dislikedArticles.filter(id => id !== articleId);
			localStorage.setItem('dislikedShortForms', JSON.stringify(filtered));
			setIsDisliked(false);
		} else {
			// 싫어요 추가
			dislikedArticles.push(articleId);
			localStorage.setItem('dislikedShortForms', JSON.stringify(dislikedArticles));
			setIsDisliked(true);

			// 좋아요가 있었다면 제거
			if (isLiked) {
				const filtered = likedArticles.filter(id => id !== articleId);
				localStorage.setItem('likedShortForms', JSON.stringify(filtered));
				setIsLiked(false);
			}
		}
	};

	// 댓글 핸들러 (추후 구현)
	const handleComment = () => {
		alert('댓글 기능은 추후 구현 예정입니다.');
	};

	return (
		<div className="py-3 px-6">
			<div className="flex items-center gap-5">
				{/* 좋아요 버튼 */}
				<button
					onClick={handleLike}
					className={`
						transition-all duration-200 active:scale-95
						${isLiked ? 'text-primary-500' : 'text-white hover:text-primary-400'}
					`}
				>
					<svg
						className="w-6 h-6"
						fill={isLiked ? 'currentColor' : 'none'}
						stroke="currentColor"
						strokeWidth={isLiked ? 0 : 2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
						/>
					</svg>
				</button>

				{/* 싫어요 버튼 */}
				<button
					onClick={handleDislike}
					className={`
						transition-all duration-200 active:scale-95
						${isDisliked ? 'text-red-500' : 'text-white hover:text-red-400'}
					`}
				>
					<svg
						className="w-6 h-6"
						fill={isDisliked ? 'currentColor' : 'none'}
						stroke="currentColor"
						strokeWidth={isDisliked ? 0 : 2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
						/>
					</svg>
				</button>

				{/* 댓글 버튼 */}
				<button
					onClick={handleComment}
					className="text-white hover:text-primary-400 transition-all duration-200 active:scale-95"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
