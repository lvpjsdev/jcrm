import { trpc } from '../../../lib/trpc';
import { zGetUsersListTrpcInput } from './input';

export const getUsersListTRPCRoute = trpc.procedure
  .input(zGetUsersListTrpcInput)
  .query(async ({ ctx, input }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        telegram: true,
        email: true,
        startDate: true,
        period: true,
        keys: true,
        serialNumber: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          serialNumber: 'desc',
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    });

    const nextUser = users.at(input.limit);
    const nextCursor = nextUser?.serialNumber;

    const usersExceptNext = users.slice(0, input.limit);
    return { users: usersExceptNext, nextCursor };
  });
