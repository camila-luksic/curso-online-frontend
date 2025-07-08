import { apiInstance } from '@/core/api/instance.api';
import type { CreateUserInput, UpdateUserInput, User } from '../types/userTypes';

const API_URL = '/usuarios';

export async function getUsers(): Promise<User[]> {
  const { data } = await apiInstance.get(API_URL);
  return data;
}

export async function getUser(id: number): Promise<User> {
  const { data } = await apiInstance.get(`${API_URL}/${id}`);
  return data;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const { data } = await apiInstance.post('/auth/register', input);
  return data;
}

export async function updateUser(id: number, input: UpdateUserInput): Promise<User> {
  const { data } = await apiInstance.patch(`${API_URL}/${id}`, input);
  return data;
}

export async function deleteUser(id: number): Promise<void> {
  await apiInstance.delete(`${API_URL}/${id}`);
} 