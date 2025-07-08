import { useQuery } from '@tanstack/react-query';
import { getMisCursos } from '../services/inscripcionService';

export const useMisCursos = () => {
  return useQuery({
    queryKey: ['mis-cursos'],
    queryFn: getMisCursos,
  });
}; 