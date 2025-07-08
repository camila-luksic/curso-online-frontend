import type { CreateCategoryInput } from '../types/categoryTypes';
import { CategoryForm } from './CategoryForm';

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCategoryInput) => void;
    loading?: boolean;
    initialValues?: Partial<CreateCategoryInput>;
    title?: string;
}

export function CategoryModal({ open, onClose, onSubmit, loading, initialValues, title }: CategoryModalProps) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white rounded shadow-2xl p-6 w-full max-w-md">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
                <h2 className="text-xl font-bold mb-4">{title || 'Categoría'}</h2>
                <CategoryForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} />
            </div>
        </div>
    );
} 