import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../services/userService';
import type { UpdateUserInput } from '../types/userTypes';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateUserInput }) =>
      updateUser(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
} 