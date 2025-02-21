import { trpc } from '../../../lib/trpc';
import { canBlockUser } from '../../../utils/can';
import { zBlockUserTrpcInput } from './input';

export const blockUserTRPCRoute = trpc.procedure
  .input(zBlockUserTrpcInput)
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
      data: { blockedAt: new Date() },
    });

    return true;
  });
