import { Divider, NavLink } from '@mantine/core';
import type { FC } from 'react';
import { NavLink as Link } from 'react-router';
import * as routes from '../../app/routes';
import { trpc } from '../../app/trpc';
import styles from './index.module.scss';

export const Navigation: FC = () => {
  const { data } = trpc.getMe.useQuery();

  return (
    <nav>
      <ul className={styles.menu}>
        {data?.me ? (
          <>
            <li>
              <NavLink
                component={Link}
                label="All users"
                to={routes.getViewAllUsersRoute()}
              />
            </li>
            <li>
              <NavLink
                component={Link}
                label="Add user"
                to={routes.getViewAddUserRoute()}
              />
            </li>
            <li>
              <NavLink
                component={Link}
                label="All keys"
                to={routes.getViewKeysListRoute()}
              />
            </li>
            <li>
              <NavLink
                component={Link}
                label="Add key"
                to={routes.getViewAddKeyRoute()}
              />
            </li>
            <Divider />
            <li>
              <NavLink
                component={Link}
                label={`Sign Out (${data.me.telegram})`}
                to={routes.getViewSignOutRoute()}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                component={Link}
                label="Sign Up"
                to={routes.getViewSignUpRoute()}
              />
            </li>
            <li>
              <NavLink
                component={Link}
                label="Sign In"
                to={routes.getViewSignInRoute()}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
