import { z } from 'zod';

export const zGetUsersListTrpcInput = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.number().min(1).max(10).default(10),
});
