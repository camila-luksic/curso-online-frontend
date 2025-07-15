import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@/core/hooks/useNotifications';
import { commentService } from '../services/commentService';
import type { UpdateCommentInput } from '../types/commentTypes';

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: ({ commentId, input }: { commentId: number; input: UpdateCommentInput }) =>
      commentService.updateComment(commentId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      showSuccess('Comentario actualizado exitosamente');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Error al actualizar el comentario';
      showError(errorMessage);
    },
  });
}; 