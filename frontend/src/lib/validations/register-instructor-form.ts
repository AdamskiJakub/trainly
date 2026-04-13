import { z } from 'zod';
import {
  createEmailSchema,
  createStrongPasswordSchema,
  createConfirmPasswordSchema,
  createFirstNameSchema,
  createLastNameSchema,
  createRequiredPhoneSchema,
  passwordMatchRefiner,
} from './schemas/auth-base';

export const createRegisterInstructorSchema = (t: (key: string) => string) => {
  const refiner = passwordMatchRefiner(t);
  
  return z
    .object({
      email: createEmailSchema(t),
      password: createStrongPasswordSchema(t),
      confirmPassword: createConfirmPasswordSchema(t),
      firstName: createFirstNameSchema(t),
      lastName: createLastNameSchema(t),
      phone: createRequiredPhoneSchema(t),
    })
    .refine(refiner.refine, {
      message: refiner.message,
      path: ['confirmPassword'],
    });
};

export type RegisterInstructorFormData = z.infer<ReturnType<typeof createRegisterInstructorSchema>>;
