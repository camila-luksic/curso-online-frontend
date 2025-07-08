import type { Category } from '../types/categoryTypes';

interface CategoryCardProps {
    category: Category;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-black">{category.nombre}</h3>
            <p className="text-black text-sm">{category.descripcion}</p>
            <div className="flex gap-2 mt-2">
                {onEdit && (
                    <button className="btn btn-primary" onClick={onEdit}>Editar</button>
                )}
                {onDelete && (
                    <button className="btn btn-danger" onClick={onDelete}>Eliminar</button>
                )}
            </div>
        </div>
    );
} 