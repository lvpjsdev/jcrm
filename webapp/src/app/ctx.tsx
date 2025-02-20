import type { TRPCRouterOutput } from '@jcrm/backend/src/routes';
import { createContext, useContext, type ReactNode } from 'react';
import { Loader } from '../shared/ui/Loader';
import { trpc } from './trpc';

export type AppContext = {
  me: TRPCRouterOutput['getMe']['me'];
};

const ReactAppContext = createContext<AppContext>({
  me: null,
});

// eslint-disable-next-line complexity
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <ReactAppContext.Provider
      value={{
        me: data?.me || null,
      }}
    >
      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        children
      )}
    </ReactAppContext.Provider>
  );
};

export const useAppContext = () => useContext(ReactAppContext);

export const useMe = () => {
  const { me } = useAppContext();
  return me;
};
