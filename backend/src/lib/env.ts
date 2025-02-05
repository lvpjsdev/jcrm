import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const zEnv = z.object({
  PORT: z
    .string()
    .transform((val) => +val)
    .default('3000'),
  JWT_SECRET: z.string(),
  SALT: z.string(),
  DATABASE_URL: z.string(),
});

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env);
