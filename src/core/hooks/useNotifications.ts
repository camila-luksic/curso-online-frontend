import toast from 'react-hot-toast';

export const useNotifications = () => {
    const showSuccess = (message: string) => {
        toast.success(message);
    };

    const showError = (message: string) => {
        toast.error(message);
    };

    const showInfo = (message: string) => {
        toast(message, {
            icon: 'ℹ️',
        });
    };

    const showWarning = (message: string) => {
        toast(message, {
            icon: '⚠️',
        });
    };

    const showLoading = (message: string) => {
        return toast.loading(message);
    };

    const dismissToast = (toastId: string) => {
        toast.dismiss(toastId);
    };

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning,
        showLoading,
        dismissToast,
    };
}; 