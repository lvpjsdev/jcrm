import { z } from 'zod';

export const zUnblockUserTrpcInput = z.object({
  id: z.string().min(1),
});
