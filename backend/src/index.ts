import cors from 'cors';
import express from 'express';
import { type AppContext, createAppContext } from './lib/ctx';
import { applyTRPCtoExpressApp } from './lib/trpc';
import { trpcRouter } from './routes';

const PORT = 3000;

let ctx: AppContext | null = null;

const main = async () => {
  try {
    const expressApp = express();
    expressApp.use(cors());
    ctx = createAppContext();
    applyTRPCtoExpressApp(expressApp, ctx, trpcRouter);
    expressApp.listen(PORT, () => {
      console.log('Server started on port 3000');
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
};

void main();
