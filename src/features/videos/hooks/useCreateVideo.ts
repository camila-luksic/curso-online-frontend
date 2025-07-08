import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVideo } from '../services/videoService';
import type { CreateVideoInput } from '../types/videoTypes';

export function useCreateVideo(cursoId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateVideoInput) => createVideo(cursoId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos', cursoId] });
    },
  });
} 