import type { TRPCRouter } from '@jcrm/backend/src/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { ReactNode } from 'react';

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
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
});

export const TRPCProvider = ({ children }: { children: ReactNode }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </trpc.Provider>
);
