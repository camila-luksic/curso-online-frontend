import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { videoSchema } from '../schema/videoSchema';

type VideoFormValues = z.infer<typeof videoSchema>;

interface VideoFormProps {
    initialValues?: Partial<VideoFormValues>;
    onSubmit: (data: VideoFormValues) => void;
    loading?: boolean;
}

export function VideoForm({ initialValues, onSubmit, loading }: VideoFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<VideoFormValues>({
        resolver: zodResolver(videoSchema),
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
                <label className="text-black dark:text-white">URL</label>
                <input {...register('url')} className="input input-bordered w-full" />
                {errors.url && <span className="text-accent text-sm">{errors.url.message}</span>}
            </div>
            <div>
                <label className="text-black dark:text-white">Orden</label>
                <input type="number" {...register('orden', { valueAsNumber: true })} className="input input-bordered w-full" />
                {errors.orden && <span className="text-accent text-sm">{errors.orden.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
} 