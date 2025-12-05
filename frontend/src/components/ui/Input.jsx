import React from 'react';

/**
 * Modern SaaS Input Component
 * @param {Object} props
 * @param {string} props.type - Input type
 * @param {string} props.variant - Input variant: 'default', 'outlined', 'filled'
 * @param {string} props.size - Input size: 'sm', 'md', 'lg'
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.leftIcon - Left icon
 * @param {React.ReactNode} props.rightIcon - Right icon
 * @param {string} props.error - Error message
 */
export default function Input({ 
	type = 'text',
	variant = 'default',
	size = 'md',
	className = '',
	leftIcon,
	rightIcon,
	error,
	...props 
}) {
	const baseClasses = 'w-full rounded-lg border transition-all ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
	
	const variantClasses = {
		default: 'border-neutral-300 bg-white focus:border-primary-500 focus:ring-primary-500',
		outlined: 'border-2 border-neutral-400 bg-white focus:border-primary-600 focus:ring-primary-500',
		filled: 'border-neutral-300 bg-neutral-50 focus:border-primary-500 focus:ring-primary-500 focus:bg-white',
	};

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2.5 text-base',
		lg: 'px-5 py-3 text-lg',
	};

	const errorClasses = error 
		? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
		: '';

	const iconPadding = {
		sm: leftIcon ? 'pl-9' : rightIcon ? 'pr-9' : '',
		md: leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '',
		lg: leftIcon ? 'pl-12' : rightIcon ? 'pr-12' : '',
	};

	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${errorClasses} ${iconPadding[size]} ${className}`.trim();

	return (
		<div className="w-full">
			<div className="relative">
				{leftIcon && (
					<div className={`absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 ${
						size === 'sm' ? 'left-3' : size === 'md' ? 'left-4' : 'left-5'
					}`}>
						{leftIcon}
					</div>
				)}
				<input 
					type={type}
					className={classes}
					{...props}
				/>
				{rightIcon && (
					<div className={`absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 ${
						size === 'sm' ? 'right-3' : size === 'md' ? 'right-4' : 'right-5'
					}`}>
						{rightIcon}
					</div>
				)}
			</div>
			{error && (
				<p className="mt-1.5 text-sm text-error-600 flex items-center gap-1">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
					</svg>
					{error}
				</p>
			)}
		</div>
	);
}

