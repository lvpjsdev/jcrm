import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TRPCRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTRPCRoute } from './auth/getMe';
import { signInTRPCRoute } from './auth/signIn';
import { signUpTRPCRoute } from './auth/signUp';
import { updateProfileTRPCRoute } from './auth/updateProfile';
import { addKeyTRPCRoute } from './keys/addKey';
import { getKeyTRPCRoute } from './keys/getKey';
import { getKeysListTRPCRoute } from './keys/getKeysList';
import { removeKeyTRPCRoute } from './keys/removeKey';
import { updateKeyTRPCRoute } from './keys/updateKey';
import { addUserTRPCRoute } from './users/addUser';
import { getUserTRPCRoute } from './users/getUser';
import { getUsersListTRPCRoute } from './users/getUsersList';
import { removeUserTRPCRoute } from './users/removeUser';
import { updateUserTRPCRoute } from './users/updateUser';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TRPCRoute,`)
  getMe: getMeTRPCRoute,
  signIn: signInTRPCRoute,
  signUp: signUpTRPCRoute,
  updateProfile: updateProfileTRPCRoute,
  addKey: addKeyTRPCRoute,
  getKey: getKeyTRPCRoute,
  getKeysList: getKeysListTRPCRoute,
  removeKey: removeKeyTRPCRoute,
  updateKey: updateKeyTRPCRoute,
  addUser: addUserTRPCRoute,
  getUser: getUserTRPCRoute,
  getUsersList: getUsersListTRPCRoute,
  removeUser: removeUserTRPCRoute,
  updateUser: updateUserTRPCRoute,
  // @endindex
});

export type TRPCRouter = typeof trpcRouter;
export type TRPCRouterInput = inferRouterInputs<TRPCRouter>;
export type TRPCRouterOutput = inferRouterOutputs<TRPCRouter>;
