import { trpc } from '../../lib/trpc';
import { addUserZodSchema } from './input';

export const addUserTRPCRoute = trpc.procedure
  .input(addUserZodSchema)
  .mutation(async ({ input, ctx }) => {
    const existUser = await ctx.prisma.user.findUnique({
      where: { telegram: input.telegram },
    });
    if (existUser) {
      throw new Error('User with this telegram already exist');
    }

    await ctx.prisma.user.create({
      data: {
        ...input,
        startDate: new Date(input.startDate),
      },
    });
  });
