interface BadgeProps {
    children: React.ReactNode;
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info';
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
    className?: string;
}

export const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    rounded = false,
    className = '',
}: BadgeProps) => {
    const variantClasses = {
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        danger: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-cyan-100 text-cyan-800',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm',
    };

    const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';

    const classes = `inline-flex items-center font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${className}`;

    return <span className={classes}>{children}</span>;
};
