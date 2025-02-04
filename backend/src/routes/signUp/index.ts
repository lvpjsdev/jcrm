import { TRPCError } from '@trpc/server';
import { trpc } from '../../lib/trpc';
import { getPassHash } from '../../utils/getPassHash';
import { signJWT } from '../../utils/signJWT';
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

    const { id } = await ctx.prisma.user.create({
      data: {
        telegram,
        password: getPassHash(password),
      },
    });

    return {
      token: signJWT(id),
    };
  });
