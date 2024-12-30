import { Link, Outlet } from 'react-router';
import * as routes from '../../app/routes';
import styles from './index.module.scss';

export const Layout = () => (
    <section className={styles.layout}>
      <nav className={styles.navigation}>
        <div className={styles.logo}>JCRM</div>
        <ul className={styles.menu}>
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
        </ul>
      </nav>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
