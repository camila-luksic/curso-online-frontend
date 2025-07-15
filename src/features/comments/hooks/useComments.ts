import { useQuery } from '@tanstack/react-query';
import { commentService } from '../services/commentService';

export const useComments = (cursoId: number) => {
  return useQuery({
    queryKey: ['comments', cursoId],
    queryFn: () => commentService.getCommentsByCurso(cursoId),
    enabled: !!cursoId,
  });
}; 