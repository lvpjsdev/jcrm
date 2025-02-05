/* eslint-disable complexity */
import type { FC } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { trpc } from '../../app/trpc';

type ProtectedRouteProps = {
  isAllowed:
    | boolean
    | ((me: { id: string; telegram: string } | undefined | null) => boolean);
  redirectPath?: string;
  children?: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAllowed: allowed,
  redirectPath = '/',
  children,
}) => {
  const navigate = useNavigate();
  const { data } = trpc.getMe.useQuery();

  const isAllowed = typeof allowed === 'function' ? allowed(data?.me) : allowed;

  if (!isAllowed) {
    void navigate(redirectPath);
  }

  return children || <Outlet />;
};
