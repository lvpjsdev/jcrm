import { Outlet } from 'react-router';
import { Navigation } from '../../features/Navigation';
import styles from './index.module.scss';

export const Layout = () => (
  <section className={styles.layout}>
    <Navigation />
    <section className={styles.content}>
      <Outlet />
    </section>
  </section>
);
