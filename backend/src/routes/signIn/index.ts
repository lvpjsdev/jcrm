import crypto from 'crypto';
import { TRPCError } from '@trpc/server';
import { trpc } from '../../lib/trpc';
import { signInInputZodSchema } from './input';

export const signInTRPCRoute = trpc.procedure
  .input(signInInputZodSchema)
  .mutation(async ({ input, ctx }) => {
    const { telegram, password } = input;
    const user = await ctx.prisma.user.findUnique({
      where: {
        telegram,
        password: crypto.createHash('sha256').update(password).digest('hex'),
      },
    });

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
    }

    return {
      success: true,
    };
  });
