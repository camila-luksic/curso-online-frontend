import { useQuery } from '@tanstack/react-query';
import { getRole } from '../services/roleService';
 
export function useRole(id: number) {
  return useQuery({ queryKey: ['role', id], queryFn: () => getRole(id) });
} 