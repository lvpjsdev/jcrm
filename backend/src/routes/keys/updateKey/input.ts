import z from 'zod';

export const updateKeyZodSchema = z.object({
  key: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
});
