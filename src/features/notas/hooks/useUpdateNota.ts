import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@/core/hooks/useNotifications';
import { updateNota } from '../services/notaService';

export const useUpdateNota = (notaId: number, inscripcionId: number) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: (input: { valor?: number; tipoNotaId?: number }) => updateNota(notaId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notas', inscripcionId] });
      showSuccess('Nota actualizada exitosamente');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Error al actualizar la nota';
      showError(errorMessage);
    },
  });
}; 