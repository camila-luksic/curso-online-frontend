import { useMutation } from '@tanstack/react-query';
import { asignarNota } from '../services/notaService';

export const useAsignarNota = (inscripcionId: number) => {
  return useMutation({
    mutationFn: (input: { tipoNotaId: number; valor: number }) => asignarNota(inscripcionId, input),
  });
}; 