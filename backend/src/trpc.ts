import { initTRPC } from '@trpc/server';
import z from 'zod';

const users = [
  { id: 1, telegram: 'user1', email: 'user1@gmail.com', startDate: '11.12.24', period: 30 },
  { id: 2, telegram: 'user2', email: 'user2@gmail.com', startDate: '11.12.24', period: 30 },
  { id: 3, telegram: 'user3', email: 'user3@gmail.com', startDate: '11.12.24', period: 30 },
  { id: 4, telegram: 'user4', email: 'user4@gmail.com', startDate: '11.12.24', period: 30 },
  { id: 5, telegram: 'user5', email: 'user5@gmail.com', startDate: '11.12.24', period: 30 },
];

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getUsersList: trpc.procedure.query(() => {
    return { users };
  }),
  getUser: trpc.procedure.input(z.object({ userId: z.string() })).query(({ input: { userId } }) => {
    return users.find((user) => user.id === +userId) || null;
  }),
});

export type TRPCRouter = typeof trpcRouter;
