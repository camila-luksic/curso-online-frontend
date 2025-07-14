export interface Autor {
  id: number;
  nombre: string;
  apellido: string;
}

export interface Comment {
  id: number;
  contenido: string;
  createdAt: string;
  updatedAt: string;
  autor: Autor;
}

export interface CreateCommentInput {
  contenido: string;
}

export interface UpdateCommentInput {
  contenido: string;
}

export interface CommentFormValues {
  contenido: string;
} 