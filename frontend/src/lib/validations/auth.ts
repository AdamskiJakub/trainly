import { z } from 'zod';

// ============================================
// LOGIN SCHEMA
// ============================================
export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t('emailRequired') })
      .email({ message: t('invalidEmail') }),
    password: z
      .string()
      .min(1, { message: t('passwordRequired') }),
  });
};

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

// ============================================
// REGISTER SCHEMA
// ============================================
export const createRegisterSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z
        .string()
        .min(1, { message: t('emailRequired') })
        .email({ message: t('invalidEmail') }),
      password: z
        .string()
        .min(8, { message: t('passwordMin') })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          {
            message: t('passwordRegex'),
          }
        ),
      confirmPassword: z.string().min(1, { message: t('confirmPasswordRequired') }),
      firstName: z
        .string()
        .trim()
        .min(1, { message: t('firstNameRequired') }),
      lastName: z
        .string()
        .trim()
        .min(1, { message: t('lastNameRequired') }),
      phone: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val || val.trim() === '') return true; // Phone is optional
            const digitsOnly = val.replace(/[\s-]/g, '');
            // Accept 9 digits OR +48 followed by 9 digits
            return /^(\+48)?[0-9]{9}$/.test(digitsOnly);
          },
          {
            message: t('phoneInvalid'),
          }
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMatch'),
      path: ['confirmPassword'],
    });
};

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
