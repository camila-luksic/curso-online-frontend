import type { Curso } from "../../courses/types/cursoTypes";

export interface Video {
  id: number;
  titulo: string;
  url: string;
  orden: number;
  curso: Curso;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVideoInput {
  titulo: string;
  url: string;
  orden: number;
}

export type UpdateVideoInput = Partial<CreateVideoInput>; 