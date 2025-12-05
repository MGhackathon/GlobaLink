import React from 'react';

/**
 * Modern SaaS Button Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'outline', 'ghost', 'danger'
 * @param {string} props.size - Button size: 'sm', 'md', 'lg'
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullWidth - Full width button
 */
export default function Button({ 
	children, 
	variant = 'primary',
	size = 'md',
	disabled = false,
	className = '',
	fullWidth = false,
	...props 
}) {
	const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
	
	const variantClasses = {
		primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md active:scale-[0.98]',
		secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-sm hover:shadow-md active:scale-[0.98]',
		outline: 'border-2 border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 focus:ring-primary-500 hover:border-neutral-400 active:scale-[0.98]',
		ghost: 'text-neutral-700 bg-transparent hover:bg-neutral-100 focus:ring-primary-500 active:scale-[0.98]',
		danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 shadow-sm hover:shadow-md active:scale-[0.98]',
	};

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm gap-1.5',
		md: 'px-4 py-2.5 text-base gap-2',
		lg: 'px-6 py-3 text-lg gap-2.5',
	};

	const widthClass = fullWidth ? 'w-full' : '';

	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

	return (
		<button className={classes} disabled={disabled} {...props}>
			{children}
		</button>
	);
}

