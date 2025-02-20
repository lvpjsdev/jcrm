/* eslint-disable complexity */
import { Alert } from '@mantine/core';
import { Link } from 'react-router';
import { getViewUserRoute } from '../../app/routes';
import { trpc } from '../../app/trpc';

export const UsersPage = () => {
  const {
    isLoading,
    isError,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getUsersList.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <>
      <h1>Users</h1>
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red" title="Error">
          {JSON.stringify(error, null, 2)}
        </Alert>
      ) : (
        <>
          <ul>
            {data?.pages
              .flatMap((page) => page.users)
              .map((user) => (
                <li key={user.id}>
                  <Link to={getViewUserRoute({ userId: user.id })}>{user.telegram}</Link>
                </li>
              ))}
          </ul>
          {hasNextPage && !isFetchingNextPage && (
            <button
              onClick={(e) => {
                e.preventDefault();
                void fetchNextPage();
              }}
            >
              Loading more
            </button>
          )}
          {isFetchingNextPage && <span>Loading...</span>}
        </>
      )}
    </>
  );
};
