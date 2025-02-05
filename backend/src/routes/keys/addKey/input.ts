import z from 'zod';

export const addKeyZodSchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
});
