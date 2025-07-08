import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/userService';

export function useUser(id: number) {
  return useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });
} 