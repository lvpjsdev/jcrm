import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router';
import * as routes from './app/routes';
import { TRPCProvider } from './app/trpc';
import { User } from './entities/User';
import { ProtectedRoute } from './features/Navigation';
import { Layout } from './layouts/Layout/Layout';
import './app/styles/global.scss';
import { AddUserPage } from './pages/AddUserPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { SignUpPage } from './pages/SignUpPage';
import { UsersPage } from './pages/UsersList';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const App = () => (
  <TRPCProvider>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.getViewSignOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route
              path={routes.getViewAllUsersRoute()}
              element={
                <ProtectedRoute isAllowed={(me) => !!me}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={routes.getViewAddUserRoute()}
              element={
                <ProtectedRoute isAllowed={(me) => !!me}>
                  <AddUserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={routes.getViewUserRoute(routes.viewUsersRouteParams)}
              element={
                <ProtectedRoute isAllowed={(me) => !!me}>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path={routes.getViewSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getViewSignInRoute()} element={<SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </TRPCProvider>
);
