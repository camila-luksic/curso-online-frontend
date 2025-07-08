import * as z from 'zod';

export const cursoSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  categoriaId: z.number({ required_error: 'La categoría es requerida' }),
  profesorId: z.number().optional(),
}); 