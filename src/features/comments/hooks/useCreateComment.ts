import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@/core/hooks/useNotifications';
import { commentService } from '../services/commentService';
import type { CreateCommentInput } from '../types/commentTypes';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: ({ cursoId, input }: { cursoId: number; input: CreateCommentInput }) =>
      commentService.createComment(cursoId, input),
    onSuccess: (_, { cursoId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', cursoId] });
      showSuccess('Comentario publicado exitosamente');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Error al publicar el comentario';
      showError(errorMessage);
    },
  });
}; 