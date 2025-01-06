import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { addUserZodSchema } from '../../../../backend/src/routes/addUser/input';
import { trpc } from '../../app/trpc';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';

const formatDate = (date: Date | number) => {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const AddUserPage = () => {
  const { mutateAsync } = trpc.addUser.useMutation();
  const formik = useFormik({
    initialValues: {
      telegram: '',
      email: '',
      startDate: formatDate(new Date()),
      period: 0,
      password: '123',
    },
    onSubmit: async (values) => {
      console.log(values);
      await mutateAsync({ ...values });
    },
    validate: withZodSchema(addUserZodSchema),
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
        <Input
          name="startDate"
          label="Start date"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.startDate}
          error={formik.errors.startDate}
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
        <Button disabled={formik.isSubmitting} type="submit">
          {formik.isSubmitting ? 'Submitting...' : 'Add user'}
        </Button>
      </form>
    </section>
  );
};
