import { trpc } from '../../../lib/trpc';
import { toClientMe } from '../../../utils/toClientMe';

export const getMeTRPCRoute = trpc.procedure.query(({ ctx }) => ({
  me: toClientMe(ctx.me),
}));
