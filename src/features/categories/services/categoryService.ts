import { apiInstance } from '@/core/api/instance.api';
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '../types/categoryTypes';

const API_URL = '/categorias';

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiInstance.get(API_URL);
  return data;
}

export async function getCategory(id: number): Promise<Category> {
  const { data } = await apiInstance.get(`${API_URL}/${id}`);
  return data;
}

export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  const { data } = await apiInstance.post(API_URL, input);
  return data;
}

export async function updateCategory(id: number, input: UpdateCategoryInput): Promise<Category> {
  const { data } = await apiInstance.put(`${API_URL}/${id}`, input);
  return data;
}

export async function deleteCategory(id: number): Promise<void> {
  await apiInstance.delete(`${API_URL}/${id}`);
} 