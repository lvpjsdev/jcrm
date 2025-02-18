import type { FC } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { useMe } from '../../app/ctx';

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
  const me = useMe();

  const isAllowed = typeof allowed === 'function' ? allowed(me) : allowed;

  if (!isAllowed) {
    void navigate(redirectPath);
  }

  return children || <Outlet />;
};
