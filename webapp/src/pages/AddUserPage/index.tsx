import { useFormik } from 'formik';
import { Input } from '../../shared/ui/Input';

export const AddUserPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      telegram: '',
      email: '',
      startDate: '',
      period: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <section>
      <h1>Add user</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          label="Name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
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
