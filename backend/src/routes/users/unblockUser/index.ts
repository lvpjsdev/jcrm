import { trpc } from '../../../lib/trpc';
import { canBlockUser } from '../../../utils/can';
import { zUnblockUserTrpcInput } from './input';

export const unblockUserTRPCRoute = trpc.procedure
  .input(zUnblockUserTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const { id } = input;

    if (!canBlockUser(ctx.me)) {
      throw new Error('PERMISSION_DENIED');
    }

    const user = await ctx.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw Error('NOT_FOUND');
    }

    await ctx.prisma.user.update({
      where: { id },
      data: { blockedAt: undefined },
    });

    return true;
  });
