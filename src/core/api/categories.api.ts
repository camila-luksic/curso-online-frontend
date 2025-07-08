import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../types/category.types';
import { apiInstance } from './instance.api';

export const getCategories = async (): Promise<Category[]> =>
  (await apiInstance.get<Category[]>('/categorias')).data;

export const getCategory = async (id: number): Promise<Category> =>
  (await apiInstance.get<Category>(`/categorias/${id}`)).data;

export const createCategory = async (payload: CreateCategoryInput): Promise<Category> =>
  (await apiInstance.post<Category>('/categorias', payload)).data;

export const updateCategory = async (
  id: number,
  payload: UpdateCategoryInput,
): Promise<Category> =>
  (await apiInstance.put<Category>(`/categorias/${id}`, payload)).data;

export const deleteCategory = async (id: number): Promise<void> => {
  await apiInstance.delete(`/categorias/${id}`);
}; 