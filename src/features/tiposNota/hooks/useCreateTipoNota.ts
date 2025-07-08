import { useMutation } from '@tanstack/react-query';
import { createTipoNota } from '../services/tipoNotaService';

export const useCreateTipoNota = (cursoId: number) => {
  return useMutation({
    mutationFn: (input: { nombre: string }) => createTipoNota(cursoId, input),
  });
}; 