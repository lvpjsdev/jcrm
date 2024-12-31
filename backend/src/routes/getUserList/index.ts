import { trpc } from '../../lib/trpc';
import { users } from '../../lib/users';

export const getUsersListTRPCRoute = trpc.procedure.query(() => ({ users }));
