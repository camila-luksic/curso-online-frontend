export interface Video {
  id: number;
  titulo: string;
  url: string;
  orden: number;
  cursoId: number;
}

export interface CreateVideoInput {
  titulo: string;
  url: string;
  orden: number;
}

export type UpdateVideoInput = Partial<CreateVideoInput>; 