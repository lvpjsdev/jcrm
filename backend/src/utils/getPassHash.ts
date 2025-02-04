import crypto from 'crypto';

export const getPassHash = (password: string) =>
  crypto.createHash('sha256').update(password).digest('hex');
