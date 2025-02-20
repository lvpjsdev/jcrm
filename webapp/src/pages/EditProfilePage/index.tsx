import type { TRPCRouterOutput } from '@jcrm/backend/src/routes';
import { updateProfileZodSchema } from '@jcrm/backend/src/routes/auth/updateProfile/input';
import { Alert, Button } from '@mantine/core';
import { useForm } from '../../app/form';
import { trpc } from '../../app/trpc';
import { withPageWrapper } from '../../shared/pageWrapper';
import { Input } from '../../shared/ui/Input';

type EditProfileProps = {
  me: NonNullable<TRPCRouterOutput['getMe']['me']>;
};

const EditProfileComponent = ({ me }: EditProfileProps) => {
  const trpcUtils = trpc.useUtils();
  const { mutateAsync } = trpc.updateUser.useMutation();
  const { data: userData } = trpc.getUser.useQuery({ userId: me.id });

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      telegram: me.telegram || '',
      email: userData?.email || '',
    },
    onSubmit: async (values) => {
      await mutateAsync({
        id: me.id,
        ...values,
      });
      void trpcUtils.getMe.invalidate();
      void trpcUtils.getUser.invalidate();
    },
    validationSchema: updateProfileZodSchema,
  });

  return (
    <section>
      <h1>Edit profile</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="telegram"
          label="Telegram ID"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.telegram}
          error={formik.errors.telegram}
          disabled={formik.isSubmitting}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          disabled={formik.isSubmitting}
        />
        <Button {...buttonProps} type="submit">
          {formik.isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
        <Alert {...alertProps} />
      </form>
    </section>
  );
};

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx, checkExists }) => ({
    me: checkExists(ctx.me, 'User not found'),
  }),
})(EditProfileComponent);
