import { z } from 'zod';

export const zBlockUserTrpcInput = z.object({
  id: z.string().min(1),
});
