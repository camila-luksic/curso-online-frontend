import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurso } from '../services/cursoService';
import type { UpdateCursoInput } from '../types/cursoTypes';

export function useUpdateCurso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateCursoInput }) => updateCurso(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cursos'] });
    },
  });
} 