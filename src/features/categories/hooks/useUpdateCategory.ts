import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../services/categoryService';
import type { UpdateCategoryInput } from '../types/categoryTypes';

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateCategoryInput }) =>
      updateCategory(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
} 