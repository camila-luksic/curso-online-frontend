import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRoles } from '../../roles/hooks/useRoles';
import { userSchema } from '../schema/userSchema';



export type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
    initialValues?: Partial<UserFormValues>;
    onSubmit: (data: UserFormValues) => void;
    loading?: boolean;
    isEdit?: boolean;
}

export function UserForm({ initialValues, onSubmit, loading, isEdit }: UserFormProps) {
    const { data: roles = [] } = useRoles();
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: initialValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="text-black dark:text-white">Usuario</label>
                <input {...register('username')} className="input input-bordered w-full" data-cy="username-input" />
                {errors.username && <span className="text-accent text-sm">{errors.username.message}</span>}
            </div>
            <div className="flex gap-2">
                <div className="flex-1">
                    <label className="text-black dark:text-white">Nombre</label>
                    <input {...register('nombre')} className="input input-bordered w-full" data-cy="nombre-input" />
                    {errors.nombre && <span className="text-accent text-sm">{errors.nombre.message}</span>}
                </div>
                <div className="flex-1">
                    <label className="text-black dark:text-white">Apellido</label>
                    <input {...register('apellido')} className="input input-bordered w-full" data-cy="apellido-input" />
                    {errors.apellido && <span className="text-accent text-sm">{errors.apellido.message}</span>}
                </div>
            </div>
            <div>
                <label className="text-black dark:text-white">Email</label>
                <input type="email" {...register('email')} className="input input-bordered w-full" data-cy="email-input" />
                {errors.email && <span className="text-accent text-sm">{errors.email.message}</span>}
            </div>
            <div>
                <label className="text-black dark:text-white">Contraseña {isEdit && <span className="text-xs text-neutral-400">(dejar vacío para no cambiar)</span>}</label>
                <input type="password" {...register('password')} className="input input-bordered w-full" autoComplete="new-password" data-cy="password-input" />
                {errors.password && <span className="text-accent text-sm">{errors.password.message}</span>}
            </div>
            <div>
                <label className="text-black dark:text-white">Rol</label>
                <select {...register('rolId', { valueAsNumber: true })} className="input input-bordered w-full" data-cy="rol-select">
                    <option value="">Selecciona un rol</option>
                    {roles.map(rol => (
                        <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                    ))}
                </select>
                {errors.rolId && <span className="text-accent text-sm">{errors.rolId.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} data-cy="save-user-button">
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    );
} 