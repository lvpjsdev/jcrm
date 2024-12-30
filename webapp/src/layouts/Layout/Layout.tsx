import { Link, Outlet } from 'react-router';
import { getViewAllUsersRoute } from '../../app/routes';
import styles from './index.module.scss';

export const Layout = () => {
  return (
    <section className={styles.layout}>
      <nav className={styles.navigation}>
        <div className={styles.logo}>JCRM</div>
        <ul className={styles.menu}>
          <li>
            <Link className={styles.link} to={getViewAllUsersRoute()}>
              All Users
            </Link>
          </li>
        </ul>
      </nav>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
};
