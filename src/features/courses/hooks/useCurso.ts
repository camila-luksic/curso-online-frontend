import { useQuery } from '@tanstack/react-query';
import { getCurso } from '../services/cursoService';

export function useCurso(id: number) {
  return useQuery({ queryKey: ['curso', id], queryFn: () => getCurso(id) });
} 