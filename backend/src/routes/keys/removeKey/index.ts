import { z } from 'zod';
import { trpc } from '../../../lib/trpc';

export const removeKeyTRPCRoute = trpc.procedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('You are not authorized');
    }

    try {
      await ctx.prisma.key.delete({
        where: { id: input.id },
      });
    } catch (error) {
      throw new Error('No key with this id');
    }
    return {
      success: true,
    };
  });
