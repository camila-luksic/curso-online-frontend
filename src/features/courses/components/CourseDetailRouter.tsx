import { useAuth } from '@/core/hooks/useAuth';
import CursoPublicDetailPage from '../../home/components/CursoPublicDetailPage';
import CursoDetailPage from '../pages/CursoDetailPage';

export const CourseDetailRouter = () => {
    const { isAuthenticated } = useAuth();

    // Si el usuario está autenticado, mostrar la vista autenticada
    if (isAuthenticated) {
        return <CursoDetailPage />;
    }

    // Si no está autenticado, mostrar la vista pública
    return <CursoPublicDetailPage />;
}; 