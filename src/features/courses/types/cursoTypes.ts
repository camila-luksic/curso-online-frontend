export interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  profesorId: number;
  categoria: {
    id: number;
    nombre: string;
  };
  profesor: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

export interface CreateCursoInput {
  titulo: string;
  descripcion: string;
  categoriaId: number;
  profesorId?: number;
}

export type UpdateCursoInput = Partial<CreateCursoInput>; 