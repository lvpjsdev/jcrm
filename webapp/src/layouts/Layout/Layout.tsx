import { Link, Outlet } from 'react-router';
import { getViewAllUsersRoute } from '../../app/routes';

export const Layout = () => {
  return (
    <div>
      <p>JCRM</p>
      <nav>
        <ul>
          <li>
            <Link to={getViewAllUsersRoute()}>All Users</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <section>
        <Outlet />
      </section>
    </div>
  );
};
