import { z } from 'zod';

export const signInInputZodSchema = z.object({
  telegram: z.string().min(1),
  password: z.string().min(1),
});
