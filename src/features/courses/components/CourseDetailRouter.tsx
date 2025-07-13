import { useAuth } from '@/core/hooks/useAuth';
import CursoPublicDetailPage from '../../home/components/CursoPublicDetailPage';
import CursoDetailPage from '../pages/CursoDetailPage';

export const CourseDetailRouter = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <CursoDetailPage />;
    }

    return <CursoPublicDetailPage />;
};

export default CourseDetailRouter; 