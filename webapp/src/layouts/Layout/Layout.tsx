import { Divider } from '@mantine/core';
import { Link, Outlet } from 'react-router';
import * as routes from '../../app/routes';
import { trpc } from '../../app/trpc';
import styles from './index.module.scss';

export const Layout = () => {
  const { data } = trpc.getMe.useQuery();

  return (
    <section className={styles.layout}>
      <nav className={styles.navigation}>
        <div className={styles.logo}>JCRM</div>
        <ul className={styles.menu}>
          {data?.me ? (
            <>
              <li>
                <Link className={styles.link} to={routes.getViewAllUsersRoute()}>
                  All users
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={routes.getViewAddUserRoute()}>
                  Add user
                </Link>
              </li>
              <Divider />
              <li>
                <Link className={styles.link} to={routes.getViewSignOutRoute()}>
                  Sign Out {`(${data.me.telegram})`}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className={styles.link} to={routes.getViewSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className={styles.link} to={routes.getViewSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
};
