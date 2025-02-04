import { BrowserRouter, Route, Routes } from 'react-router';
import * as routes from './app/routes';
import { TRPCProvider } from './app/trpc';
import { User } from './entities/User';
import { Layout } from './layouts/Layout/Layout';
import './app/styles/global.scss';
import { AddUserPage } from './pages/AddUserPage';
import { UsersPage } from './pages/UsersList';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const App = () => (
  <TRPCProvider>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getViewAllUsersRoute()} element={<UsersPage />} />
            <Route path={routes.getViewAddUserRoute()} element={<AddUserPage />} />
            <Route
              path={routes.getViewUserRoute(routes.viewUsersRouteParams)}
              element={<User />}
            />
            <Route path={routes.getViewSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getViewSignInRoute()} element={<SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </TRPCProvider>
);
