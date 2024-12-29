import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from './trpc';

const expressApp = express();

let number: number = '1';

expressApp.use(cors());

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
);

expressApp.listen(3000, () => {
  console.log('Server started on port 3000');
});
