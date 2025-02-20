import { trpc } from '../../../lib/trpc';
import { updateProfileZodSchema } from './input';

export const updateProfileTRPCRoute = trpc.procedure
  .input(updateProfileZodSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }

    if (ctx.me.telegram !== input.telegram) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          telegram: input.telegram,
        },
      });

      if (exUser) {
        throw new Error('User with this telegram already exists');
      }
    }

    const updatedMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: input,
    });

    ctx.me = updatedMe;

    return {
      id: updatedMe.id,
      telegram: updatedMe.telegram,
    };
  });
