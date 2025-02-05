import { Link } from 'react-router';
import { getViewUserRoute } from '../../app/routes';
import { trpc } from '../../app/trpc';

export const UsersPage = () => {
  const { isLoading, isError, isFetching, data, error } = trpc.getUsersList.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return (
      <>
        <span>{`Something goes wrong :( ...`}</span>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  return (
    <>
      <h1>Users</h1>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            <Link to={getViewUserRoute({ userId: user.id })}>{user.telegram}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
