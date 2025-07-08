import { useQuery } from '@tanstack/react-query';
import { getProgresoCurso } from '../services/progresoService';

export const useProgresoCurso = (cursoId: number) => {
  return useQuery({
    queryKey: ['progreso-curso', cursoId],
    queryFn: () => getProgresoCurso(cursoId),
    enabled: !!cursoId,
  });
}; 