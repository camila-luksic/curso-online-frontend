import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVideo } from '../services/videoService';

export function useDeleteVideo(cursoId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos', cursoId] });
    },
  });
} 