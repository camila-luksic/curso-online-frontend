import type { UserFormValues } from './UserForm';
import { UserForm } from './UserForm';

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormValues) => void;
    loading?: boolean;
    initialValues?: Partial<UserFormValues>;
    title?: string;
    isEdit?: boolean;
}

export function UserModal({ open, onClose, onSubmit, loading, initialValues, title, isEdit }: UserModalProps) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white rounded shadow-2xl p-6 w-full max-w-md dark:bg-neutral-900">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white" aria-label="Cerrar">×</button>
                <h2 className="text-xl font-bold mb-4">{title || (isEdit ? 'Editar Usuario' : 'Nuevo Usuario')}</h2>
                <UserForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} isEdit={isEdit} />
            </div>
        </div>
    );
} 