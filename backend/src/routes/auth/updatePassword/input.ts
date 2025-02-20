import z from 'zod';

export const zUpdatePasswordZodSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
});
