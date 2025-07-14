import * as z from 'zod';

const passwordValidation = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
  .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
  .regex(/[0-9]/, 'La contraseña debe tener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un carácter especial');

export const userSchema = z.object({
  username: z.string().min(1, 'El usuario es requerido'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  password: z.union([
    z.undefined(),
    z.literal(''),
    passwordValidation
  ]),
  rolId: z.number({ required_error: 'El rol es requerido' }),
});

export const updatePasswordSchema = z.object({
  newPassword: passwordValidation,
});
