import { z } from 'zod';
import {
  createEmailSchema,
  createStrongPasswordSchema,
  createConfirmPasswordSchema,
  createFirstNameSchema,
  createLastNameSchema,
  createOptionalPhoneSchema,
  passwordMatchRefiner,
} from './schemas/auth-base';

export const createRegisterClientSchema = (t: (key: string) => string) => {
  const refiner = passwordMatchRefiner(t);
  
  return z
    .object({
      email: createEmailSchema(t),
      password: createStrongPasswordSchema(t),
      confirmPassword: createConfirmPasswordSchema(t),
      firstName: createFirstNameSchema(t),
      lastName: createLastNameSchema(t),
      phone: createOptionalPhoneSchema(t),
    })
    .refine(refiner.refine, {
      message: refiner.message,
      path: ['confirmPassword'],
    });
};

export type RegisterClientFormData = z.infer<ReturnType<typeof createRegisterClientSchema>>;
