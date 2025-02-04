import { z } from 'zod';

export const signUpInputZodSchema = z.object({
  telegram: z.string().min(5).max(32),
  password: z.string().min(3),
});
