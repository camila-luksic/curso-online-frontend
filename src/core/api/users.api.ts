import type {
    CreateUserInput,
    UpdateUserInput,
    User,
} from '../types/user.types';
import { apiInstance } from './instance.api';

export const getUsers = async (): Promise<User[]> =>
  (await apiInstance.get<User[]>('/usuarios')).data;

export const getUser = async (id: number): Promise<User> =>
  (await apiInstance.get<User>(`/usuarios/${id}`)).data;

export const createUser = async (payload: CreateUserInput): Promise<User> =>
  (await apiInstance.post<User>('/auth/register', payload)).data;

export const updateUser = async (
  id: number,
  payload: UpdateUserInput,
): Promise<User> =>
  (await apiInstance.patch<User>(`/usuarios/${id}`, payload)).data;

export const deleteUser = async (id: number): Promise<void> => {
  await apiInstance.delete(`/usuarios/${id}`);
};

export const getUsersByRole = async (rol: string): Promise<User[]> => {
  const res = await apiInstance.get<User[]>(`/usuarios?rol=${rol}`);
  return res.data;
}; 