import { z } from 'zod';
import { trpc } from '../../../lib/trpc';
import { updateUserZodSchema } from './input';

export const updateUserTRPCRoute = trpc.procedure
  .input(updateUserZodSchema.extend({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('You are not authorized');
    }

    try {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          ...input,
          keys: {
            set: input.keys?.map((keyId) => ({
              userId_keyId: {
                userId: input.id,
                keyId,
              },
            })),
          },
        },
      });

      if (ctx.me.id === input.id) {
        ctx.me = updatedUser;
      }
    } catch (error) {
      throw new Error('No user with this id');
    }
    return {
      success: true,
    };
  });
