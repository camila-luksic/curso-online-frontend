import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { categorySchema } from '../schema/categorySchema';
import type { CreateCategoryInput } from '../types/categoryTypes';

interface Props {
    initialValues?: Partial<CreateCategoryInput>;
    onSubmit: (data: CreateCategoryInput) => void;
    loading?: boolean;
}

export function CategoryForm({ initialValues, onSubmit, loading }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateCategoryInput>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="text-black">Nombre</label>
                <input {...register('nombre')} className="input input-bordered w-full" />
                {errors.nombre && <span className="text-accent text-sm">{errors.nombre.message}</span>}
            </div>
            <div>
                <label className="text-black">Descripción</label>
                <textarea {...register('descripcion')} className="input input-bordered w-full" />
                {errors.descripcion && <span className="text-accent text-sm">{errors.descripcion.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
} 