import { trpc } from '../../../lib/trpc';
import { addKeyZodSchema } from './input';

export const addKeyTRPCRoute = trpc.procedure
  .input(addKeyZodSchema)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('You are not authorized');
    }

    const existKey = await ctx.prisma.key.findUnique({
      where: { key: input.key },
    });
    if (existKey) {
      throw new Error('User with this telegram already exist');
    }

    await ctx.prisma.key.create({
      data: {
        ...input,
      },
    });
  });
