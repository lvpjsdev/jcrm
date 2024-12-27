import { trpc } from '../../lib/trpc';

export const UsersPage = () => {
  const { isLoading, isError, isFetching, data, error } = trpc.users.useQuery();

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
        {data?.users.map((user) => {
          return <li key={user.id}>{user.telegram}</li>;
        })}
      </ul>
    </>
  );
};
