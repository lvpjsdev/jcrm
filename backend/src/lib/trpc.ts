import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { Express } from 'express';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express';
import type { TRPCRouter } from '../routes';
import type { ExpressRequest } from '../utils/types';
import type { AppContext } from './ctx';

const getCreateTRPCContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    me: (req as ExpressRequest).user || null,
  });

type TrpcContext = Awaited<ReturnType<typeof getCreateTRPCContext>>;

export const trpc = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const applyTRPCtoExpressApp = async (
  expressApp: Express,
  AppContext: AppContext,
  trpcRouter: TRPCRouter
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTRPCContext(AppContext),
    })
  );

  expressApp.use(
    '/trpc-playground',

    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  );
};
