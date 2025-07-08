import { useState, useCallback } from 'react';

interface ErrorState {
    hasError: boolean;
    message: string;
    details?: string;
}

export const useErrorHandler = () => {
    const [error, setError] = useState<ErrorState>({
        hasError: false,
        message: '',
    });

    const handleError = useCallback((error: unknown) => {
        let message = 'Ha ocurrido un error inesperado';
        let details: string | undefined;

        if (error instanceof Error) {
            message = error.message;
            details = error.stack;
        } else if (typeof error === 'string') {
            message = error;
        } else if (error && typeof error === 'object' && 'message' in error) {
            message = String(error.message);
        }

        setError({
            hasError: true,
            message,
            details,
        });
    }, []);

    const clearError = useCallback(() => {
        setError({
            hasError: false,
            message: '',
        });
    }, []);

    const handleAsyncError = useCallback(
        async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
            try {
                clearError();
                return await asyncFn();
            } catch (err) {
                handleError(err);
                return null;
            }
        },
        [handleError, clearError]
    );

    return {
        error,
        handleError,
        clearError,
        handleAsyncError,
    };
};
