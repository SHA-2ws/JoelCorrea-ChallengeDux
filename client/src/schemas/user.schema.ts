import { z } from 'zod';
import { UserStatus } from '@/types/user';

export const userSchema = z.object({
  id: z.string().nullable(),
  usuario: z.string()
    .min(1, { message: 'Usuario es requerido' })
    .min(3, { message: 'Usuario debe tener al menos 3 caracteres' }),
  estado: z.nativeEnum(UserStatus, {
    errorMap: () => ({ message: 'Estado es requerido' })
  }),
  sector: z.number().int().positive({ message: 'Sector es requerido' })
});

export type UserSchema = z.infer<typeof userSchema>; 