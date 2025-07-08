import type { Role } from "../../roles/types/roleTypes";

export interface User {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  rol: Role
}

export interface CreateUserInput {
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rolId: number;
}

export type UpdateUserInput = Partial<Omit<CreateUserInput, 'password'>> & { password?: string }; 