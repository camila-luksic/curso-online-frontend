import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { updatePasswordSchema } from '../schema/userSchema';

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

interface UpdatePasswordModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: UpdatePasswordFormValues) => void;
    loading?: boolean;
    userName?: string;
}

export function UpdatePasswordModal({ open, onClose, onSubmit, loading, userName }: UpdatePasswordModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdatePasswordFormValues>({
        resolver: zodResolver(updatePasswordSchema),
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white rounded shadow-2xl p-6 w-full max-w-md dark:bg-neutral-900">
                <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white" aria-label="Cerrar">×</button>
                <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
                {userName && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Cambiando contraseña para: <strong>{userName}</strong>
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-black dark:text-white">Nueva Contraseña</label>
                        <input
                            type="password"
                            {...register('newPassword')}
                            className="input input-bordered w-full"
                            autoComplete="new-password"
                            data-cy="new-password-input"
                        />
                        {errors.newPassword && <span className="text-accent text-sm">{errors.newPassword.message}</span>}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="btn btn-secondary flex-1"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary flex-1"
                            disabled={loading}
                            data-cy="update-password-button"
                        >
                            {loading ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 