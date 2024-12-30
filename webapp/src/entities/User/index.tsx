/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import type { FC } from 'react';
import { useParams } from 'react-router';
import type { ViewUsersRouteParams } from '../../app/routes';
import { trpc } from '../../app/trpc';

// interface UserProps {
//   id: number;
//   //   telegram: string;
//   //   email: string;
//   //   startDate: string;
//   //   period: number;
// }

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
      <div>{startDate}</div>
      <div>{period}</div>
    </section>
  );
};
