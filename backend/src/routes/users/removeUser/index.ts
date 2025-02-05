import { z } from 'zod';
import { trpc } from '../../../lib/trpc';

export const removeUserTRPCRoute = trpc.procedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('You are not authorized');
    }

    try {
      await ctx.prisma.user.delete({
        where: { id: input.id },
      });
    } catch (error) {
      throw new Error('No user with this id');
    }
    return {
      success: true,
    };
  });
