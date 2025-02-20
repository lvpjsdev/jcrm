import { Alert } from '@mantine/core';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router';
import { getViewUserRoute } from '../../app/routes';
import { trpc } from '../../app/trpc';
import { layoutContentRef } from '../../layouts/Layout/Layout';

const checkNeedUseWindow = () =>
  (layoutContentRef.current &&
    getComputedStyle(layoutContentRef.current).overflow !== 'auto') ||
  undefined;

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
        <InfiniteScroll
          threshold={250}
          loadMore={() => {
            if (hasNextPage && !isFetchingNextPage) {
              void fetchNextPage();
            }
          }}
          hasMore={hasNextPage}
          loader={<span key={'loader'}>Loading...</span>}
          getScrollParent={() => layoutContentRef.current}
          useWindow={checkNeedUseWindow()}
        >
          {data?.pages
            .flatMap((page) => page.users)
            .map((user) => (
              <div key={user.id}>
                <Link to={getViewUserRoute({ userId: user.id })}>{user.telegram}</Link>
              </div>
            ))}
        </InfiniteScroll>
      )}
    </>
  );
};
