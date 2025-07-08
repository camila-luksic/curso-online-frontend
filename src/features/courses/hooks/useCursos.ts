import { useQuery } from '@tanstack/react-query';
import { getCursos } from '../services/cursoService';

export function useCursos() {
  return useQuery({ queryKey: ['cursos'], queryFn: getCursos });
} 