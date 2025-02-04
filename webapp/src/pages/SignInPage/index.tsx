import { Paper, Button } from '@mantine/core';
import { Input } from '../../shared/ui/Input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { signInInputZodSchema } from '@jcrm/backend/src/routes/signIn/input';
import { trpc } from '../../app/trpc';

export const SignInPage = () => {
  const signIn = trpc.signIn.useMutation();
  const formik = useFormik({
    initialValues: {
      telegram: '',
      password: '',
    },
    validate: withZodSchema(signInInputZodSchema),
    onSubmit: async (values) => {
      await signIn.mutateAsync(values);
      formik.resetForm();
    },
  });

  return (
    <div>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="telegram"
            label="Telegram ID"
            type="text"
            value={formik.values.telegram}
            onChange={formik.handleChange}
            error={formik.errors.telegram}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Paper>
    </div>
  );
};
