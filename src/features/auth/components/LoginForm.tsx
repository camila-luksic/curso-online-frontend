import { Button, Input } from '@/core/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../schemas/login.schema';
import type { LoginFormData } from '../types/auth.types';

export const LoginForm = () => {
    const { login, loading, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        console.log('Login data:', data);
        login(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <Input
                    type="email"
                    label="Email"
                    placeholder="tu@email.com"
                    data-cy="email-input"
                    {...register('email')}
                    error={errors.email?.message}
                />
            </div>

            <div>
                <Input
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    data-cy="password-input"
                    {...register('password')}
                    error={errors.password?.message}
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
                disabled={loading}
                data-cy="login-button"
            >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
        </form>
    );
}; 