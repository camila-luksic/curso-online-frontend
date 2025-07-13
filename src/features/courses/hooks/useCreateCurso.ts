import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '../../../core/hooks/useNotifications';
import { createCurso } from '../services/cursoService';

export function useCreateCurso() {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useNotifications();

    return useMutation({
        mutationFn: createCurso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cursos'] });
            showSuccess('Curso creado exitosamente');
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'Error al crear el curso';
            showError(errorMessage);
        },
    });
} 