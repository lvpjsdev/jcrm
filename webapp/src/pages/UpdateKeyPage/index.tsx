import { updateKeyZodSchema } from '@jcrm/backend/src/routes/keys/updateKey/input';
import { Alert, Button, Textarea } from '@mantine/core';
import { useParams } from 'react-router';
import { useForm } from '../../app/form';
import type { ViewKeysRouteParams } from '../../app/routes';
import { trpc } from '../../app/trpc';
import { withPageWrapper } from '../../shared/pageWrapper';
import { Input } from '../../shared/ui/Input';

export const UpdateKeyPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const { keyId } = useParams() as ViewKeysRouteParams;
    return trpc.getKey.useQuery({ keyId });
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const key = checkExists(queryResult.data);
    checkAccess(ctx.me);
    return { key };
  },
})(({ key }) => {
  const updateKey = trpc.updateKey.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: key.name || '',
      key: key.key,
    },
    onSubmit: async (values) => {
      await updateKey.mutateAsync({ id: key.id, ...values });
    },
    validationSchema: updateKeyZodSchema,
  });

  return (
    <section>
      <h1>Update key</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          label="Key name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          disabled={formik.isSubmitting}
        />
        <Textarea
          name="key"
          label="Key"
          onChange={formik.handleChange}
          value={formik.values.key}
          error={formik.errors.key}
          disabled={formik.isSubmitting}
        />
        <Button {...buttonProps} type="submit">
          {'Update key'}
        </Button>
        <Alert {...alertProps} />
      </form>
    </section>
  );
});
