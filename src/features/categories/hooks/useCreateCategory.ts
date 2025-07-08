import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../services/categoryService';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
} 