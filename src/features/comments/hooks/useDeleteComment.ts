import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@/core/hooks/useNotifications';
import { commentService } from '../services/commentService';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: commentService.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      showSuccess('Comentario eliminado exitosamente');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Error al eliminar el comentario';
      showError(errorMessage);
    },
  });
}; 