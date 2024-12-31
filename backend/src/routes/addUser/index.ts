import { trpc } from '../../lib/trpc';
import { users } from '../../lib/users';
import { addUserZodSchema } from './input';

export const addUserTRPCRoute = trpc.procedure
  .input(addUserZodSchema)
  .mutation(({ input }) => {
    console.log(input);

    return users.unshift({ ...input, startDate: `${input.startDate}`, id: +new Date() });
  });
