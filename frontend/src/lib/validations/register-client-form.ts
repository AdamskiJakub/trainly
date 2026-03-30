import { z } from 'zod';
import {
  createEmailSchema,
  createStrongPasswordSchema,
  createConfirmPasswordSchema,
  createFirstNameSchema,
  createLastNameSchema,
  createOptionalPhoneSchema,
} from './schemas/auth-base';

export const createRegisterClientSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: createEmailSchema(t),
      password: createStrongPasswordSchema(t),
      confirmPassword: createConfirmPasswordSchema(t),
      firstName: createFirstNameSchema(t),
      lastName: createLastNameSchema(t),
      phone: createOptionalPhoneSchema(t),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        message: t('passwordMatch'),
        path: ['confirmPassword'],
      }
    );
};

export type RegisterClientFormData = z.infer<ReturnType<typeof createRegisterClientSchema>>;
