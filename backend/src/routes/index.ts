import { trpc } from '../lib/trpc';
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TRPCRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getUserTRPCRoute } from './getUser';
import { getUsersListTRPCRoute } from './getUsersList';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TRPCRoute,`)
  getUser: getUserTRPCRoute,
  getUsersList: getUsersListTRPCRoute,
  // @endindex
});

export type TRPCRouter = typeof trpcRouter;
