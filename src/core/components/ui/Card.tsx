import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    actions?: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
    children,
    title,
    subtitle,
    actions,
    className = '',
    padding = 'md',
    shadow = 'sm',
}: CardProps) => {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const shadowClasses = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-lg',
    };

    const cardClasses = `bg-white rounded-lg border border-gray-200 ${shadowClasses[shadow]} ${className}`;

    return (
        <div className={cardClasses}>
            {(title || subtitle || actions) && (
                <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
                    <div>
                        {title && (
                            <h3 className='text-lg font-medium text-gray-900'>
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className='mt-1 text-sm text-gray-500'>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {actions && (
                        <div className='flex items-center space-x-2'>
                            {actions}
                        </div>
                    )}
                </div>
            )}

            <div className={paddingClasses[padding]}>{children}</div>
        </div>
    );
};
