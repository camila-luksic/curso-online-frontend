import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            helperText,
            className = '',
            id,
            rows = 3,
            ...props
        },
        ref
    ) => {
        const textareaId =
            id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

        const baseClasses =
            'block w-full rounded-md border-gray-300 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-vertical';
        const errorClasses =
            'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500';

        const textareaClasses = `${baseClasses} ${error ? errorClasses : ''} ${className}`;

        return (
            <div className='w-full'>
                {label && (
                    <label
                        htmlFor={textareaId}
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        {label}
                    </label>
                )}

                <textarea
                    ref={ref}
                    id={textareaId}
                    rows={rows}
                    className={textareaClasses}
                    {...props}
                />

                {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}

                {helperText && !error && (
                    <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea'; 