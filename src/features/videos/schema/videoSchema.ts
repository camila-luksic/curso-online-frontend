import * as z from 'zod';
 
export const videoSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido'),
  url: z.string().url('URL inválida'),
  orden: z.number({ required_error: 'El orden es requerido' }),
}); 