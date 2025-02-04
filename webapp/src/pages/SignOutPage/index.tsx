import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

import { trpc } from '../../app/trpc';
import { getViewSignInRoute } from '../../app/routes';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  useEffect(() => {
    Cookies.remove('token');
    void trpcUtils.invalidate();
    navigate(getViewSignInRoute());
  }, []);
  return <p>Loading...</p>;
};
