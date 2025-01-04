import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { Express } from 'express';
import type { TRPCRouter } from '../routes';
import type { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create();

export const applyTRPCtoExpressApp = (
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
};
