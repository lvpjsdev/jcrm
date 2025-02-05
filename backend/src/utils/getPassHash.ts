import crypto from 'crypto';
import { env } from '../lib/env';

export const getPassHash = (password: string) =>
  crypto.createHash('sha256').update(`${password}${env.SALT}`).digest('hex');
