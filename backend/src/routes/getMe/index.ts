import { trpc } from '../../lib/trpc';

export const getMeTRPCRoute = trpc.procedure.query(({ ctx }) => ({
  me: ctx.me && {
    id: ctx.me.id,
    telegram: ctx.me.telegram,
  },
}));
