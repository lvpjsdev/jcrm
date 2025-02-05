import z from 'zod';
import { trpc } from '../../../lib/trpc';

export const getKeyTRPCRoute = trpc.procedure
  .input(z.object({ keyId: z.string() }))
  .query(
    async ({ input: { keyId }, ctx }) =>
      await ctx.prisma.key.findUnique({ where: { id: keyId } })
  );
