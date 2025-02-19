import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppContextProvider } from './app/ctx';
import * as routes from './app/routes';
import { TRPCProvider } from './app/trpc';
import { User } from './entities/User';
import { ProtectedRoute } from './features/Navigation';
import { Layout } from './layouts/Layout/Layout';
import './app/styles/global.scss';
import { AddKeyPage } from './pages/AddKeyPage';
import { AddUserPage } from './pages/AddUserPage';
import { KeysList } from './pages/KeysList/KeysList';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { SignUpPage } from './pages/SignUpPage';
import { UpdateKeyPage } from './pages/UpdateKeyPage';
import { UpdateUserPage } from './pages/UpdateUserPage';
import { UsersPage } from './pages/UsersList';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { NotFoundPage } from './pages/NotFoundPage';

const theme = createTheme({});

export const App = () => (
  <TRPCProvider>
    <AppContextProvider>
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
                path={routes.getViewUpdateUserRoute(routes.viewUsersRouteParams)}
                element={
                  <ProtectedRoute isAllowed={(me) => !!me}>
                    <UpdateUserPage />
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
              <Route
                path={routes.getViewKeysListRoute()}
                element={
                  <ProtectedRoute isAllowed={(me) => !!me}>
                    <KeysList />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.getViewAddKeyRoute()}
                element={
                  <ProtectedRoute isAllowed={(me) => !!me}>
                    <AddKeyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={routes.getViewUpdateKeyRoute(routes.viewKeysRouteParams)}
                element={
                  <ProtectedRoute isAllowed={(me) => !!me}>
                    <UpdateKeyPage />
                  </ProtectedRoute>
                }
              />
              <Route path={routes.getViewSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getViewSignInRoute()} element={<SignInPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AppContextProvider>
  </TRPCProvider>
);
