import { useQuery } from '@tanstack/react-query';
import { getTiposNota } from '../services/tipoNotaService';

export const useTiposNota = (cursoId: number) => {
  return useQuery({
    queryKey: ['tipos-nota', cursoId],
    queryFn: () => getTiposNota(cursoId),
    enabled: !!cursoId,
  });
}; 