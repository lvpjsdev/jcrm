import { addUserZodSchema } from '@jcrm/backend/src/routes/users/addUser/input';
import { Alert, Button, MultiSelect } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '../../app/form';
import { trpc } from '../../app/trpc';
import { userPermissions } from '../../entities/User';
import { Input } from '../../shared/ui/Input';

export const AddUserPage = () => {
  const { mutateAsync } = trpc.addUser.useMutation();
  const { data: keys } = trpc.getKeysList.useQuery();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      telegram: '',
      email: '',
      startDate: new Date(),
      period: 0,
      password: '123',
      keys: [],
      permissions: [],
    },
    onSubmit: async (values) => {
      await mutateAsync({ ...values, startDate: new Date(values.startDate) });
    },
    validationSchema: addUserZodSchema,
  });

  const keysOptions = keys?.map((key) => ({
    value: key.id,
    label: key.name || key.id,
  }));

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
        <MultiSelect
          name="keys"
          label="Keys"
          data={keysOptions}
          // eslint-disable-next-line no-void
          onChange={(value) => void formik.setFieldValue('keys', value)}
          value={formik.values.keys}
          disabled={formik.isSubmitting}
        />
        <MultiSelect
          name="permissions"
          label="Permissions"
          data={userPermissions}
          // eslint-disable-next-line no-void
          onChange={(value) => void formik.setFieldValue('permissions', value)}
          value={formik.values.permissions}
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
