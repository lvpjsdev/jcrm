import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { Express } from 'express';
import type { TRPCRouter } from '../routes';

export const trpc = initTRPC.create();

export const applyTRPCtoExpressApp = (expressApp: Express, trpcRouter: TRPCRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  );
};
