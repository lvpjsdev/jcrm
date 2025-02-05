/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import type { FC } from 'react';
import { Link, useParams } from 'react-router';
import { getViewUpdateUserRoute, type ViewUsersRouteParams } from '../../app/routes';
import { trpc } from '../../app/trpc';

// eslint-disable-next-line complexity
export const User: FC = () => {
  const { userId } = useParams() as ViewUsersRouteParams;

  const { isLoading, isError, isFetching, data, error } = trpc.getUser.useQuery({
    userId,
  });

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

  const { email, startDate, period } = data || {};

  return (
    <section>
      <h1>{userId}</h1>
      <div>{email}</div>
      <div>{startDate?.toLocaleDateString()}</div>
      <div>{period}</div>
      <Link to={getViewUpdateUserRoute({ userId })}>Edit</Link>
    </section>
  );
};
