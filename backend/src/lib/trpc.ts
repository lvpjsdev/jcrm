import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { Express } from 'express';
import { expressHandler } from 'trpc-playground/handlers/express';
import type { TRPCRouter } from '../routes';
import type { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create();

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
    '/trpc/playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc/playground',
      router: trpcRouter,
    })
  );
};
