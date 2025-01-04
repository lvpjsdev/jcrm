import { trpc } from '../../lib/trpc';

export const getUsersListTRPCRoute = trpc.procedure.query(
  async ({ ctx }) => await ctx.prisma.user.findMany({})
);
