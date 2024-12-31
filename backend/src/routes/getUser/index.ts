import z from 'zod';
import { trpc } from '../../lib/trpc';
import { users } from '../../lib/users';

export const getUserTRPCRoute = trpc.procedure
  .input(z.object({ userId: z.string() }))
  .query(({ input: { userId } }) => users.find((user) => user.id === +userId) || null);
