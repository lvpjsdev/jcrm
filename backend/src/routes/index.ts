import { trpc } from '../lib/trpc';
import { getUserTRPCRoute } from './getUser';
import { getUsersListTRPCRoute } from './getUserList';

export const trpcRouter = trpc.router({
  getUsersList: getUsersListTRPCRoute,
  getUser: getUserTRPCRoute,
});

export type TRPCRouter = typeof trpcRouter;
