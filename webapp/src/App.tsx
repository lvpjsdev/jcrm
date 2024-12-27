import { TRPCProvider } from './lib/trpc';
import { UsersPage } from './pages/users';

export const App = () => {
  return (
    <TRPCProvider>
      <UsersPage />
    </TRPCProvider>
  );
};
