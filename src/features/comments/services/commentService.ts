import { apiInstance } from '@/core/api/instance.api';
import type { Comment, CreateCommentInput, UpdateCommentInput } from '../types/commentTypes';

export const commentService = {
  getCommentsByCurso: async (cursoId: number): Promise<Comment[]> => {
    const { data } = await apiInstance.get<Comment[]>(`/cursos/${cursoId}/comentarios`);
    return data;
  },

  createComment: async (cursoId: number, input: CreateCommentInput): Promise<Comment> => {
    const { data } = await apiInstance.post<Comment>(`/cursos/${cursoId}/comentarios`, input);
    return data;
  },

  updateComment: async (commentId: number, input: UpdateCommentInput): Promise<Comment> => {
    const { data } = await apiInstance.put<Comment>(`/comentarios/${commentId}`, input);
    return data;
  },

  deleteComment: async (commentId: number): Promise<void> => {
    await apiInstance.delete(`/comentarios/${commentId}`);
  },
}; 