import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { Express } from 'express';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express';
import type { TRPCRouter } from '../routes';
import type { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create({
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
      createContext: () => AppContext,
    })
  );

  expressApp.use(
    '/trpc-playground',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
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
