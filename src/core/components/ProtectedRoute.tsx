import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ProtectedRouteProps } from '../types/common.types';

export const ProtectedRoute = ({
    children,
    allowedRoles,
    redirectTo = '/login',
}: ProtectedRouteProps) => {
    const { isAuthenticated, usuario, loading } = useAuth();
    const location = useLocation();

    // Mostrar loading mientras se verifica la autenticación
    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Si se especifican roles permitidos, verificar que el usuario tenga el rol correcto
    if (allowedRoles && allowedRoles.length > 0) {
        const userRoleCode = usuario?.rol?.codigo;

        if (!userRoleCode || !allowedRoles.includes(userRoleCode as any)) {
            // Redirigir según el rol del usuario
            const roleRedirects: Record<string, string> = {
                ADMIN: '/admin/cursos',
                PROF: '/teachers/dashboard',
                EST: '/students/dashboard',
            };

            const redirectPath = userRoleCode
                ? roleRedirects[userRoleCode] || '/'
                : '/';
            return <Navigate to={redirectPath} replace />;
        }
    }

    return <>{children}</>;
};
