import { trpc } from '../../../lib/trpc';

export const getKeysListTRPCRoute = trpc.procedure.query(
  async ({ ctx }) => await ctx.prisma.key.findMany({})
);
