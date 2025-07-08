export interface Rol {
  id: number;
  codigo: string;
  nombre: string;
}

export interface User {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  permisos: string[];
}

export interface CreateUserInput {
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rolId: number;
  password: string;
}

export type UpdateUserInput = Partial<CreateUserInput>; 