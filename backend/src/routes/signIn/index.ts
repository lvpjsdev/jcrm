import { TRPCError } from '@trpc/server';
import { trpc } from '../../lib/trpc';
import { getPassHash } from '../../utils/getPassHash';
import { signJWT } from '../../utils/signJWT';
import { signInInputZodSchema } from './input';

export const signInTRPCRoute = trpc.procedure
  .input(signInInputZodSchema)
  .mutation(async ({ input, ctx }) => {
    const { telegram, password } = input;

    const user = await ctx.prisma.user.findUnique({
      where: {
        telegram,
        password: getPassHash(password),
      },
    });

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
    }

    const token = signJWT(user.id);

    console.log('token', token);

    return {
      token,
    };
  });
