import * as z from 'zod';

export const userSchema = z.object({
  username: z.string().min(1, 'El usuario es requerido'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().optional(),
  rolId: z.number({ required_error: 'El rol es requerido' }),
});
