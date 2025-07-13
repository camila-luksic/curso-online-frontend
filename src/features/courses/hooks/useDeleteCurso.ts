import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '../../../core/hooks/useNotifications';
import { deleteCurso } from '../services/cursoService';

export function useDeleteCurso() {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useNotifications();

    return useMutation({
        mutationFn: deleteCurso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cursos'] });
            showSuccess('Curso eliminado exitosamente');
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'Error al eliminar el curso';
            showError(errorMessage);
        },
    });
} 