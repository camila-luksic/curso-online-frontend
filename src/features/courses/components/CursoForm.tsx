import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCategories } from '../../categories/hooks/useCategories';
import { useUsers } from '../../users/hooks/useUsers';
import { cursoSchema } from '../schema/cursoSchema';

export type CursoFormValues = z.infer<typeof cursoSchema> & { imagen?: File | null };

interface CursoFormProps {
    initialValues?: Partial<CursoFormValues> & { imagenUrl?: string; id?: number };
    onSubmit: (data: CursoFormValues) => void;
    loading?: boolean;
}

export function CursoForm({ initialValues, onSubmit, loading }: CursoFormProps) {
    const { data: categorias = [] } = useCategories();
    const { data: usuarios = [] } = useUsers();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CursoFormValues>({
        resolver: zodResolver(cursoSchema),
        defaultValues: initialValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="text-black dark:text-white">Título</label>
                <input {...register('titulo')} className="input input-bordered w-full" />
                {errors.titulo && <span className="text-accent text-sm">{errors.titulo.message}</span>}
            </div>
            <div>
                <label className="text-black dark:text-white">Descripción</label>
                <textarea {...register('descripcion')} className="input input-bordered w-full" />
                {errors.descripcion && <span className="text-accent text-sm">{errors.descripcion.message}</span>}
            </div>
            <div>
                <label className="text-black dark:text-white">Categoría</label>
                <select {...register('categoriaId', { valueAsNumber: true })} className="input input-bordered w-full">
                    <option value="">Selecciona una categoría</option>
                    {categorias?.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                </select>
                {errors.categoriaId && <span className="text-accent text-sm">{errors.categoriaId.message}</span>}
            </div>
            <div>
                <label className="text-black dark:text-white">Profesor</label>
                <select {...register('profesorId', { valueAsNumber: true })} className="input input-bordered w-full">
                    <option value="">Selecciona un profesor</option>
                    {usuarios?.filter(u => u.rol?.codigo === 'PROF').map(u => (
                        <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
                    ))}
                </select>
                {errors.profesorId && <span className="text-accent text-sm">{errors.profesorId.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
} 