import { z } from 'zod';

const zEnv = z.object({
  VITE_API_TRPC_URL: z.string().trim().min(1),
});

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env);
