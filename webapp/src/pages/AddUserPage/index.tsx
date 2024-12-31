import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { addUserZodSchema } from '../../../../backend/src/routes/addUser/input';
import { trpc } from '../../app/trpc';
import { Input } from '../../shared/ui/Input';

// const NOW = new Date();

export const AddUserPage = () => {
  const { mutateAsync } = trpc.addUser.useMutation();
  const formik = useFormik({
    initialValues: {
      telegram: '',
      email: '',
      startDate: '',
      period: 0,
    },
    onSubmit: async (values) => {
      console.log(values);
      await mutateAsync({ ...values, startDate: values.startDate });
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
        />
        <Input
          name="email"
          label="Email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          name="startDate"
          label="Start date"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.startDate}
        />
        <Input
          name="period"
          label="Validity period"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.period}
        />
        <button type="submit">Add user</button>
      </form>
    </section>
  );
};
