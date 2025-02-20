import z from 'zod';

export const updateProfileZodSchema = z.object({
  telegram: z.string().min(5).max(32).optional(),
  email: z.string().email().optional(),
});
