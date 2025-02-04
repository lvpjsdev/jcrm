import { trpc } from '../../lib/trpc';
import { getPassHash } from '../../utils/getPassHash';
import { addUserZodSchema } from './input';

export const addUserTRPCRoute = trpc.procedure
  .input(addUserZodSchema)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('You are not authorized');
    }

    const existUser = await ctx.prisma.user.findUnique({
      where: { telegram: input.telegram },
    });
    if (existUser) {
      throw new Error('User with this telegram already exist');
    }

    await ctx.prisma.user.create({
      data: {
        ...input,
        startDate: input.startDate,
        password: getPassHash(input.password),
      },
    });
  });
