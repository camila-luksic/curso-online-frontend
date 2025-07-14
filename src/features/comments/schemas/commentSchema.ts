import { z } from 'zod';

export const commentSchema = z.object({
  contenido: z
    .string()
    .min(1, 'El comentario no puede estar vacío')
    .max(500, 'El comentario no puede tener más de 500 caracteres'),
});

export type CommentFormValues = z.infer<typeof commentSchema>; 