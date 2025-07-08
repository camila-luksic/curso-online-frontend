import type { Category } from './category.types';
import type { User } from './user.types';

export interface Course {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  categoria: Category;
  profesor: Pick<User, 'id' | 'nombre' | 'apellido'>;
}

export interface CourseEnrollment {
  id: number;
  cursoId: number;
  estudianteId: number;
  fechaInscripcion: string;
  estudiante: Pick<User, 'id' | 'nombre' | 'apellido' | 'email' >;
}

export interface CreateCourseInput {
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  categoriaId: number;
  profesorId: number;
}

export type UpdateCourseInput = Partial<CreateCourseInput>; 