import type { TRPCRouterOutput } from '@jcrm/backend/src/routes';
import { zUpdatePasswordZodSchema } from '@jcrm/backend/src/routes/auth/updatePassword/input';
import { updateProfileZodSchema } from '@jcrm/backend/src/routes/auth/updateProfile/input';
import { Alert, Button } from '@mantine/core';
import { z } from 'zod';
import { useForm } from '../../app/form';
import { trpc } from '../../app/trpc';
import { withPageWrapper } from '../../shared/pageWrapper';
import { Input } from '../../shared/ui/Input';

type EditProfileProps = {
  me: NonNullable<TRPCRouterOutput['getMe']['me']>;
};

const GeneralForm = ({ me }: EditProfileProps) => {
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
  );
};

const PasswordUpdateForm = () => {
  const updatePassword = trpc.updatePassword.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordZodSchema
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must be the same',
            path: ['newPasswordAgain'],
          });
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({
        newPassword,
        oldPassword,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name="oldPassword"
        label="Old Password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.oldPassword}
        error={formik.errors.oldPassword}
        disabled={formik.isSubmitting}
      />
      <Input
        name="newPassword"
        label="New Password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        error={formik.errors.newPassword}
        disabled={formik.isSubmitting}
      />
      <Input
        name="newPasswordAgain"
        label="New Password Again"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.newPasswordAgain}
        error={formik.errors.newPasswordAgain}
        disabled={formik.isSubmitting}
      />
      <Button {...buttonProps} type="submit">
        {formik.isSubmitting ? 'Saving...' : 'Save changes'}
      </Button>
      <Alert {...alertProps} />
    </form>
  );
};

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx, checkExists }) => ({
    me: checkExists(ctx.me, 'User not found'),
  }),
})(({ me }) => (
  <section>
    <h1>Update Profile</h1>
    <section>
      <h2>General</h2>
      <GeneralForm me={me} />
    </section>
    <section>
      <h2>Change Password</h2>
      <PasswordUpdateForm />
    </section>
  </section>
));
