import cors from 'cors';
import express from 'express';
import { applyTRPCtoExpressApp } from './lib/trpc';
import { trpcRouter } from './routes';

const PORT = 3000;

const expressApp = express();

expressApp.use(cors());

applyTRPCtoExpressApp(expressApp, trpcRouter);

expressApp.listen(PORT, () => {
  console.log('Server started on port 3000');
});
