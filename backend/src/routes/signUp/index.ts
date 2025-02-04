import crypto from 'crypto';
import { TRPCError } from '@trpc/server';
import { trpc } from '../../lib/trpc';
import { signUpInputZodSchema } from './input';

export const signUpTRPCRoute = trpc.procedure
  .input(signUpInputZodSchema)
  .mutation(async ({ input, ctx }) => {
    const { telegram, password } = input;

    const exUser = await ctx.prisma.user.findUnique({
      where: {
        telegram,
      },
    });

    if (exUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User already exists',
      });
    }

    await ctx.prisma.user.create({
      data: {
        telegram,
        password: crypto.createHash('sha256').update(password).digest('hex'),
      },
    });

    return {
      success: true,
    };
  });
