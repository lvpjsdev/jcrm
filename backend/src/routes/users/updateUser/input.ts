import z from 'zod';

export const updateUserZodSchema = z.object({
  telegram: z.string().min(5).max(32).optional(),
  email: z.string().email().optional(),
  startDate: z.date().optional(),
  period: z.number().min(1).max(100).optional(),
});
