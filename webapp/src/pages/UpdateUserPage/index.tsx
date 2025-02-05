/* eslint-disable complexity */
import { updateUserZodSchema } from '@jcrm/backend/src/routes/users/updateUser/input';
import { Alert, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useParams } from 'react-router';
import { useForm } from '../../app/form';
import type { ViewUsersRouteParams } from '../../app/routes';
import { trpc } from '../../app/trpc';
import { Input } from '../../shared/ui/Input';

export const UpdateUserPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const { userId } = useParams() as ViewUsersRouteParams;
  const { data } = trpc.getUser.useQuery({ userId });
  const { mutateAsync } = trpc.updateUser.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      telegram: data?.telegram || '',
      email: data?.email || '',
      startDate: data?.startDate || new Date(),
      period: data?.period || 0,
    },
    onSubmit: async (values) => {
      console.log(values);
      await mutateAsync({ id: userId, ...values });
    },
    validationSchema: updateUserZodSchema,
  });

  return (
    <section>
      <h1>Add user</h1>
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
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          disabled={formik.isSubmitting}
        />
        <DateInput
          name="startDate"
          label="Start date"
          // eslint-disable-next-line no-void
          onChange={(date) => void formik.setFieldValue('startDate', date)}
          value={formik.values.startDate}
          error={formik.errors.startDate && formik.errors.startDate}
          disabled={formik.isSubmitting}
        />
        <Input
          name="period"
          label="Validity period"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.period}
          error={formik.errors.period}
          disabled={formik.isSubmitting}
        />
        <Button {...buttonProps} type="submit">
          {formik.isSubmitting ? 'Submitting...' : 'Update user'}
        </Button>
        <Alert {...alertProps} />
      </form>
    </section>
  );
};
