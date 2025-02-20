import { trpc } from '../../../lib/trpc';
import { getPassHash } from '../../../utils/getPassHash';
import { zUpdateProfileZodSchema } from './input';

export const updatePasswordTRPCRoute = trpc.procedure
  .input(zUpdateProfileZodSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }

    if (getPassHash(input.oldPassword) !== ctx.me.password) {
      throw new Error('Wrong old password');
    }

    const updatedMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        password: getPassHash(input.newPassword),
      },
    });

    ctx.me = updatedMe;
    return true;
  });
