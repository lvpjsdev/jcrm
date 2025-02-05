import { z } from 'zod';
import { trpc } from '../../../lib/trpc';
import { updateKeyZodSchema } from './input';

export const updateKeyTRPCRoute = trpc.procedure
  .input(updateKeyZodSchema.extend({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('You are not authorized');
    }

    try {
      await ctx.prisma.key.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    } catch (error) {
      throw new Error('No key with this id');
    }
    return {
      success: true,
    };
  });
