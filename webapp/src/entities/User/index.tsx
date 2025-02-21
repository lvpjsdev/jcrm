/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { canBlockUser } from '@jcrm/backend/src/utils/can';
import { Button } from '@mantine/core';
import type { FC } from 'react';
import { Link, useParams } from 'react-router';
import { useMe } from '../../app/ctx';
import { useForm } from '../../app/form';
import { getViewUpdateUserRoute, type ViewUsersRouteParams } from '../../app/routes';
import { trpc } from '../../app/trpc';
import { Loader } from '../../shared/ui/Loader';

export const userPermissions = [
  {
    value: 'ALL',
    label: 'All',
  },
  {
    value: 'BLOCK_USERS',
    label: 'Block users',
  },
];

// eslint-disable-next-line complexity
export const User: FC = () => {
  const { userId } = useParams() as ViewUsersRouteParams;
  const me = useMe();

  const { isLoading, isError, isFetching, data, error } = trpc.getUser.useQuery({
    userId,
  });
  const blockUser = trpc.blockUser.useMutation();
  const unblockUser = trpc.unblockUser.useMutation();

  const { formik, buttonProps } = useForm({
    initialValues: {},
    onSubmit: async () => {
      if (data?.blockedAt) {
        await unblockUser.mutateAsync({ id: data.id });
      }
      if (data && !data.blockedAt) {
        await blockUser.mutateAsync({ id: data.id });
      }
    },
  });

  if (isLoading || isFetching) {
    return <Loader type="section" />;
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
      {canBlockUser(me) && (
        <form onSubmit={formik.handleSubmit}>
          <Button {...buttonProps}>Block user</Button>
        </form>
      )}
    </section>
  );
};
