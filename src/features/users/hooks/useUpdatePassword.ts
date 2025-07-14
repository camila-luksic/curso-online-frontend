import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@/core/hooks/useNotifications';
import { updatePassword } from '../services/userService';

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  return useMutation({
    mutationFn: ({ id, newPassword }: { id: number; newPassword: string }) =>
      updatePassword(id, newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showSuccess('Contraseña actualizada exitosamente');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Error al actualizar la contraseña';
      showError(errorMessage);
    },
  });
} 