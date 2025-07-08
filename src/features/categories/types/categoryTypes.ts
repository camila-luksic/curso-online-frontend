export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface CreateCategoryInput {
  nombre: string;
  descripcion: string;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>; 