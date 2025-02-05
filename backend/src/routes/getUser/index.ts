import z from 'zod';
import { trpc } from '../../lib/trpc';

export const getUserTRPCRoute = trpc.procedure
  .input(z.object({ userId: z.string() }))
  .query(
    async ({ input: { userId }, ctx }) =>
      await ctx.prisma.user.findUnique({ where: { id: userId } })
  );
