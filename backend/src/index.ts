import cors from 'cors';
import express from 'express';
import { type AppContext, createAppContext } from './lib/ctx';
import { env } from './lib/env';
import { applyPassportToExpressApp } from './lib/passport';
import { applyTRPCtoExpressApp } from './lib/trpc';
import { trpcRouter } from './routes';

let ctx: AppContext | null = null;

const main = async () => {
  try {
    const expressApp = express();
    expressApp.use(cors());
    ctx = createAppContext();
    applyPassportToExpressApp(expressApp, ctx);
    await applyTRPCtoExpressApp(expressApp, ctx, trpcRouter);
    expressApp.listen(env.PORT, () => {
      console.log(`Server started on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
};

void main();
