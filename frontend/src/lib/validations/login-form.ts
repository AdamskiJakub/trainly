import { z } from 'zod';
import {
  createEmailSchema,
  createLoginPasswordSchema,
} from './schemas/auth-base';


export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: createEmailSchema(t),
    password: createLoginPasswordSchema(t),
  });
};

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
