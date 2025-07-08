import { useState } from 'react';
import { CategoryCard } from '../components/CategoryCard';
import { CategoryModal } from '../components/CategoryModal';
import { useCategories } from '../hooks/useCategories';
import { useCreateCategory } from '../hooks/useCreateCategory';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import type { Category, CreateCategoryInput } from '../types/categoryTypes';

export default function CategoryListPage() {
    const { data: categories, isLoading } = useCategories();
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const [modalOpen, setModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const handleCreate = (data: CreateCategoryInput) => {
        createCategory.mutate(data, { onSuccess: () => setModalOpen(false) });
    };

    const handleEdit = (data: CreateCategoryInput) => {
        if (editCategory) {
            updateCategory.mutate({ id: editCategory.id, input: data }, { onSuccess: () => setEditCategory(null) });
        }
    };

    const handleDelete = (category: Category) => {
        if (window.confirm(`¿Eliminar la categoría "${category.nombre}"?`)) {
            deleteCategory.mutate(category.id);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categorías</h1>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    + Nueva Categoría
                </button>
            </div>
            {isLoading ? (
                <div>Cargando categorías...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories?.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onEdit={() => setEditCategory(category)}
                            onDelete={() => handleDelete(category)}
                        />
                    ))}
                </div>
            )}
            {/* Modal para crear */}
            <CategoryModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreate}
                loading={createCategory.isPending}
                title="Nueva Categoría"
            />
            {/* Modal para editar */}
            <CategoryModal
                open={!!editCategory}
                onClose={() => setEditCategory(null)}
                onSubmit={handleEdit}
                loading={updateCategory.isPending}
                initialValues={editCategory ?? undefined}
                title="Editar Categoría"
            />
        </div>
    );
} 