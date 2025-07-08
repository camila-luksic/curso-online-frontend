import { useMutation } from '@tanstack/react-query';
import { marcarVideoVisto } from '../services/progresoService';

export const useMarcarVideoVisto = () => {
  return useMutation({
    mutationFn: (videoId: number) => marcarVideoVisto(videoId),
  });
}; 