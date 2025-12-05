import React from 'react';

/**
 * Modern SaaS Card Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Enable hover effect
 * @param {string} props.variant - Card variant: 'default', 'elevated', 'outlined', 'flat'
 * @param {React.ReactNode} props.header - Optional header content
 * @param {React.ReactNode} props.footer - Optional footer content
 */
export default function Card({ 
	children, 
	className = '', 
	hover = false,
	variant = 'default',
	header,
	footer,
	...props 
}) {
	const baseClasses = 'bg-white rounded-lg transition-all ease-in-out duration-150';
	
	const variantClasses = {
		default: 'border border-gray-200 shadow-sm',
		elevated: 'border border-gray-200 shadow-sm',
		outlined: 'border-2 border-gray-300 shadow-none',
		flat: 'border-none shadow-none',
	};

	const hoverClasses = hover 
		? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' 
		: '';

	const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`.trim();

	return (
		<div className={classes} {...props}>
			{header && (
				<div className="px-6 py-4 border-b border-neutral-200">
					{header}
				</div>
			)}
			<div className={header || footer ? 'px-6 py-4' : 'p-6'}>
				{children}
			</div>
			{footer && (
				<div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-xl">
					{footer}
				</div>
			)}
		</div>
	);
}

