import { User } from './entities/User';
import { TRPCProvider } from './app/trpc';
import { UsersPage } from './pages/users';
import { BrowserRouter, Route, Routes } from 'react-router';
import { getViewAllUsersRoute, getViewUserRoute, viewUsersRouteParams } from './app/routes';
import { Layout } from './layouts/Layout/Layout';
import './app/styles/global.scss';

export const App = () => {
  return (
    <TRPCProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getViewAllUsersRoute()} element={<UsersPage />} />
            <Route path={getViewUserRoute(viewUsersRouteParams)} element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TRPCProvider>
  );
};
