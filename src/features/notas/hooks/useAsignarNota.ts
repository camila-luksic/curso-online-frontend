import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@/core/hooks/useNotifications';
import { asignarNota } from '../services/notaService';

export const useAsignarNota = (inscripcionId: number) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: (input: { tipoNotaId: number; valor: number }) => asignarNota(inscripcionId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notas', inscripcionId] });
      showSuccess('Nota guardada exitosamente');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Error al guardar la nota';
      showError(errorMessage);
    },
  });
}; 