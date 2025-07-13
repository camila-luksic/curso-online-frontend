import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '../../../core/hooks/useNotifications';
import { updateCurso } from '../services/cursoService';
import type { CursoFormValues } from '../components/CursoForm';

export function useUpdateCurso() {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useNotifications();

    return useMutation({
        mutationFn: ({ id, input }: { id: number; input: CursoFormValues }) =>
            updateCurso(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cursos'] });
            showSuccess('Curso actualizado exitosamente');
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'Error al actualizar el curso';
            showError(errorMessage);
        },
    });
} 