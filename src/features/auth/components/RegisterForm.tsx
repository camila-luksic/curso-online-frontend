import { Button, Input, Select } from '@/core/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRoles } from '../../roles/hooks/useRoles';
import { useRegister } from '../hooks/useRegister';
import { registerSchema } from '../schemas/register.schema';
import type { RegisterFormData } from '../types/auth.types';

export const RegisterForm = () => {
    const { register: registerUser, loading, error } = useRegister();
    const { data: roles = [], isLoading: rolesLoading } = useRoles();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        registerUser(data);
    };

    // Convertir roles a formato de opciones para el Select
    const roleOptions = roles.map((role: { id: number; nombre: string }) => ({
        value: role.id.toString(),
        label: role.nombre
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="text"
                    label="Nombre de usuario"
                    placeholder="usuario123"
                    data-cy="username-input"
                    {...register('username')}
                    error={errors.username?.message}
                />

                <Select
                    label="Rol"
                    options={roleOptions}
                    placeholder={rolesLoading ? "Cargando roles..." : "Selecciona un rol"}
                    disabled={rolesLoading}
                    data-cy="role-select"
                    {...register('rolId', { valueAsNumber: true })}
                    error={errors.rolId?.message}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="text"
                    label="Nombre"
                    placeholder="Juan"
                    data-cy="name-input"
                    {...register('nombre')}
                    error={errors.nombre?.message}
                />

                <Input
                    type="text"
                    label="Apellido"
                    placeholder="Pérez"
                    data-cy="lastname-input"
                    {...register('apellido')}
                    error={errors.apellido?.message}
                />
            </div>

            <Input
                type="email"
                label="Email"
                placeholder="tu@email.com"
                data-cy="email-input"
                {...register('email')}
                error={errors.email?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="password"
                    label="Contraseña"
                    placeholder="••••••••"
                    data-cy="password-input"
                    {...register('password')}
                    error={errors.password?.message}
                />

                <Input
                    type="password"
                    label="Confirmar contraseña"
                    placeholder="••••••••"
                    data-cy="confirm-password-input"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                />
            </div>

            {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md" data-cy="error-message">
                    {error}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading || rolesLoading}
                data-cy="register-button"
            >
                {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
        </form>
    );
}; 