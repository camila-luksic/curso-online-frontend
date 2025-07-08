import type { CreateRoleInput, Role, UpdateRoleInput } from '../types/role.types';
import { apiInstance } from './instance.api';

export async function getRoles(): Promise<Role[]> {
  const { data } = await apiInstance.get('/roles');
  return data;
}

export async function createRole(input: CreateRoleInput): Promise<Role> {
  const { data } = await apiInstance.post('/roles', input);
  return data;
}

export async function updateRole(id: number, input: UpdateRoleInput): Promise<Role> {
  const { data } = await apiInstance.put(`/roles/${id}`, input);
  return data;
}

export async function deleteRole(id: number): Promise<void> {
  await apiInstance.delete(`/roles/${id}`);
} 