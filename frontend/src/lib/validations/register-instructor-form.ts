import { z } from 'zod';
import {
  createEmailSchema,
  createStrongPasswordSchema,
  createConfirmPasswordSchema,
  createFirstNameSchema,
  createLastNameSchema,
  createRequiredPhoneSchema,
} from './schemas/auth-base';

export const createRegisterInstructorSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: createEmailSchema(t),
      password: createStrongPasswordSchema(t),
      confirmPassword: createConfirmPasswordSchema(t),
      firstName: createFirstNameSchema(t),
      lastName: createLastNameSchema(t),
      phone: createRequiredPhoneSchema(t),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        message: t('passwordMatch'),
        path: ['confirmPassword'],
      }
    );
};

export type RegisterInstructorFormData = z.infer<ReturnType<typeof createRegisterInstructorSchema>>;
