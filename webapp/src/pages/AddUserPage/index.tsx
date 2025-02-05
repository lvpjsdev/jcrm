import { addUserZodSchema } from '@jcrm/backend/src/routes/users/addUser/input';
import { Alert, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '../../app/form';
import { trpc } from '../../app/trpc';
import { Input } from '../../shared/ui/Input';

export const AddUserPage = () => {
  const { mutateAsync } = trpc.addUser.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      telegram: '',
      email: '',
      startDate: new Date(),
      period: 0,
      password: '123',
    },
    onSubmit: async (values) => {
      console.log(values);
      await mutateAsync({ ...values, startDate: new Date(values.startDate) });
    },
    validationSchema: addUserZodSchema,
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
          error={formik.errors.startDate && `${formik.errors.startDate}`}
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
          {formik.isSubmitting ? 'Submitting...' : 'Add user'}
        </Button>
        <Alert {...alertProps} />
      </form>
    </section>
  );
};
