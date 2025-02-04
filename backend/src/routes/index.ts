import { trpc } from '../lib/trpc';
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TRPCRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { addUserTRPCRoute } from './addUser';
import { getUserTRPCRoute } from './getUser';
import { getUsersListTRPCRoute } from './getUsersList';
import { signUpTRPCRoute } from './signUp';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TRPCRoute,`)
  addUser: addUserTRPCRoute,
  getUser: getUserTRPCRoute,
  getUsersList: getUsersListTRPCRoute,
  signUp: signUpTRPCRoute,
  // @endindex
});

export type TRPCRouter = typeof trpcRouter;
