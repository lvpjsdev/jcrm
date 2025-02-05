import { signInInputZodSchema } from '@jcrm/backend/src/routes/signIn/input';
import { Paper, Button } from '@mantine/core';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { getViewAddUserRoute } from '../../app/routes';
import { trpc } from '../../app/trpc';
import { Input } from '../../shared/ui/Input';

export const SignInPage = () => {
  const signIn = trpc.signIn.useMutation();
  const trpcUtils = trpc.useUtils();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      telegram: '',
      password: '',
    },
    validate: withZodSchema(signInInputZodSchema),
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 30 });
      formik.resetForm();
      void trpcUtils.invalidate();
      void navigate(getViewAddUserRoute());
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
