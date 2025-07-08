import { useQuery } from '@tanstack/react-query';
import { getInscripcionesDeCurso } from '../services/inscripcionService';

export const useInscripcionesDeCurso = (cursoId: number) => {
  return useQuery({
    queryKey: ['inscripciones-curso', cursoId],
    queryFn: () => getInscripcionesDeCurso(cursoId),
    enabled: !!cursoId,
  });
}; 