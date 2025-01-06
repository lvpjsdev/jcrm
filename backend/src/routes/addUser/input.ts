import z from 'zod';

export const addUserZodSchema = z.object({
  telegram: z
    .string()
    .min(3)
    .max(20)
    .regex(/[a-z0-9_]{5,32}/),
  email: z.string().email(),
  startDate: z.string().date().or(z.date()),
  period: z.number().min(1).max(100),
  password: z.string().min(1),
});
