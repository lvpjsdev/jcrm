import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { z } from 'zod';
import { Input } from '../../shared/ui/Input';

const NOW = new Date();

export const AddUserPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      telegram: '',
      email: '',
      startDate: NOW,
      period: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(3).max(20),
        telegram: z
          .string()
          .min(3)
          .max(20)
          .regex(/[a-z0-9_]{5,32}/),
        email: z.string().email(),
        startDate: z.date().min(NOW),
        period: z.number().min(1).max(100),
      })
    ),
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
