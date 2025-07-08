import { apiInstance } from '@/core/api/instance.api';
import type { CreateRoleInput, Role, UpdateRoleInput } from '../types/roleTypes';

const API_URL = '/roles';

export async function getRoles(): Promise<Role[]> {
  const { data } = await apiInstance.get(API_URL);
  return data;
}

export async function getRole(id: number): Promise<Role> {
  const { data } = await apiInstance.get(`${API_URL}/${id}`);
  return data;
}

export async function createRole(input: CreateRoleInput): Promise<Role> {
  const { data } = await apiInstance.post(API_URL, input);
  return data;
}

export async function updateRole(id: number, input: UpdateRoleInput): Promise<Role> {
  const { data } = await apiInstance.put(`${API_URL}/${id}`, input);
  return data;
}

export async function deleteRole(id: number): Promise<void> {
  await apiInstance.delete(`${API_URL}/${id}`);
} 