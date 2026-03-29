import { z } from 'zod';

/**
 * Base validation schemas for authentication forms.
 * These are reusable building blocks that can be composed into form-specific schemas.
 */

// Email validation
export const createEmailSchema = (t: (key: string) => string) =>
  z
    .string()
    .min(1, { message: t('emailRequired') })
    .email({ message: t('invalidEmail') });

// Password validation for login (any non-empty password)
export const createLoginPasswordSchema = (t: (key: string) => string) =>
  z.string().min(1, { message: t('passwordRequired') });

// Strong password validation for registration
export const createStrongPasswordSchema = (t: (key: string) => string) =>
  z
    .string()
    .min(8, { message: t('passwordMin') })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: t('passwordRegex') }
    );

// Confirm password (must match password field)
export const createConfirmPasswordSchema = (t: (key: string) => string) =>
  z.string().min(1, { message: t('confirmPasswordRequired') });

// First name with trimming
export const createFirstNameSchema = (t: (key: string) => string) =>
  z
    .string()
    .trim()
    .min(1, { message: t('firstNameRequired') });

// Last name with trimming
export const createLastNameSchema = (t: (key: string) => string) =>
  z
    .string()
    .trim()
    .min(1, { message: t('lastNameRequired') });

// Phone validation (optional - Polish format)
export const createOptionalPhoneSchema = (t: (key: string) => string) =>
  z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true; // Phone is optional
        const digitsOnly = val.replace(/[\s-]/g, '');
        // Accept 9 digits OR +48 followed by 9 digits
        return /^(\+48)?[0-9]{9}$/.test(digitsOnly);
      },
      { message: t('phoneInvalid') }
    );

// Phone validation (required - Polish format)
export const createRequiredPhoneSchema = (t: (key: string) => string) =>
  z
    .string()
    .min(1, { message: t('phoneRequired') })
    .refine(
      (val) => {
        if (!val) return false;
        const digitsOnly = val.replace(/[\s-]/g, '');
        return /^(\+48)?[0-9]{9}$/.test(digitsOnly);
      },
      { message: t('phoneInvalid') }
    );

// Password match refiner (for registration forms)
export const passwordMatchRefiner = (t: (key: string) => string) => ({
  refine: (data: { password: string; confirmPassword: string }) =>
    data.password === data.confirmPassword,
  message: t('passwordMatch'),
  path: ['confirmPassword'] as const,
});
