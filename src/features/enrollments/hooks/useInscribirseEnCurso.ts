import { useMutation } from '@tanstack/react-query';
import { inscribirseEnCurso } from '../services/inscripcionService';
 
export const useInscribirseEnCurso = () => {
  return useMutation({
    mutationFn: (cursoId: number) => inscribirseEnCurso(cursoId),
  });
}; 