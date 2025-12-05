import React from 'react';

const DEFAULT_CATEGORIES = [
	{ code: null, name: '전체' },
	{ code: 'business', name: '비즈니스' },
	{ code: 'entertainment', name: '엔터테인먼트' },
	{ code: 'general', name: '일반' },
	{ code: 'health', name: '건강' },
	{ code: 'science', name: '과학' },
	{ code: 'sports', name: '스포츠' },
	{ code: 'technology', name: '기술' }
];

export default function CategorySelector({ value, onChange, categories = DEFAULT_CATEGORIES }) {
	return (
		<select 
			value={value || ''} 
			onChange={(e) => onChange?.(e.target.value || null)} 
			className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all ease-in-out duration-150 hover:border-gray-400"
		>
			{categories.map((c) => (
				<option key={c.code || 'all'} value={c.code || ''}>{c.name}</option>
			))}
		</select>
	);
}