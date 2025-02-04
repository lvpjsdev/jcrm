import { Paper, Button } from '@mantine/core';
import { Input } from '../../shared/ui/Input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { signInInputZodSchema } from '@jcrm/backend/src/routes/signIn/input';
import { trpc } from '../../app/trpc';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { getViewAddUserRoute } from '../../app/routes';

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
      navigate(getViewAddUserRoute());
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
