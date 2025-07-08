import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRole } from '../services/roleService';
import type { UpdateRoleInput } from '../types/roleTypes';

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateRoleInput }) =>
      updateRole(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
} 