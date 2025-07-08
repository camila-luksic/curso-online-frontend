import { useQuery } from '@tanstack/react-query';
import { getCategory } from '../services/categoryService';
 
export function useCategory(id: number) {
  return useQuery({ queryKey: ['category', id], queryFn: () => getCategory(id) });
} 