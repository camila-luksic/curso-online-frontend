import { useQuery } from '@tanstack/react-query';
import { getVideosByCurso } from '../services/videoService';
 
export function useVideosByCurso(cursoId: number) {
  return useQuery({ queryKey: ['videos', cursoId], queryFn: () => getVideosByCurso(cursoId) });
} 