import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVideo } from '../services/videoService';
import type { UpdateVideoInput } from '../types/videoTypes';

export function useUpdateVideo(cursoId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateVideoInput }) => updateVideo(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos', cursoId] });
    },
  });
} 