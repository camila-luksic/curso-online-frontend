export interface Role {
  id: number;
  codigo: string;
  nombre: string;
}

export interface CreateRoleInput {
  codigo: string;
  nombre: string;
}

export type UpdateRoleInput = Partial<CreateRoleInput>; 