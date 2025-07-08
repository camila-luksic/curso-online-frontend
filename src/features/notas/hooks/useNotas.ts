import { useQuery } from '@tanstack/react-query';
import { getNotas } from '../services/notaService';

export const useNotas = (inscripcionId: number) => {
  return useQuery({
    queryKey: ['notas', inscripcionId],
    queryFn: () => getNotas(inscripcionId),
    enabled: !!inscripcionId,
  });
}; 