import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getViewSignInRoute } from '../../app/routes';
import { trpc } from '../../app/trpc';
import { Loader } from '../../shared/ui/Loader';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  useEffect(() => {
    Cookies.remove('token');
    void trpcUtils.invalidate();
    void navigate(getViewSignInRoute());
  }, []);
  return <Loader />;
};
