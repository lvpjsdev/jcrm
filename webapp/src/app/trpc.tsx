import type { TRPCRouter } from '@jcrm/backend/src/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import Cookies from 'js-cookie';
import type { ReactNode } from 'react';
import superjson from 'superjson';
import { env } from './env';

export const trpc = createTRPCReact<TRPCRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: env.VITE_API_TRPC_URL,
      headers: () => {
        const token = Cookies.get('token');
        return {
          ...(token && { authorization: `Bearer ${token}` }),
        };
      },
      transformer: superjson,
    }),
  ],
});

export const TRPCProvider = ({ children }: { children: ReactNode }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </trpc.Provider>
);
