import { User } from './entities/User';
import { TRPCProvider } from './app/trpc';
import { UsersPage } from './pages/users';
import { BrowserRouter, Route, Routes } from 'react-router';
import * as routes from './app/routes';
import { Layout } from './layouts/Layout/Layout';
import './app/styles/global.scss';
import { AddUserPage } from './pages/AddUserPage';

export const App = () => {
  return (
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
};
