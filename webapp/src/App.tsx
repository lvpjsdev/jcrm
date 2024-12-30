import { BrowserRouter, Route, Routes } from 'react-router';
import * as routes from './app/routes';
import { TRPCProvider } from './app/trpc';
import { User } from './entities/User';
import { Layout } from './layouts/Layout/Layout';
import './app/styles/global.scss';
import { AddUserPage } from './pages/AddUserPage';
import { UsersPage } from './pages/users';

export const App = () => (
    <TRPCProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getViewAllUsersRoute()} element={<UsersPage />} />
            <Route path={routes.getViewAddUserRoute()} element={<AddUserPage />} />
            <Route path={routes.getViewUserRoute(routes.viewUsersRouteParams)} element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TRPCProvider>
  );
