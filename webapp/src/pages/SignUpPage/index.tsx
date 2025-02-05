import { signUpInputZodSchema } from '@jcrm/backend/src/routes/auth/signUp/input';
import { Button, Paper } from '@mantine/core';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { useForm } from '../../app/form';
import { getViewAllUsersRoute } from '../../app/routes';
import { trpc } from '../../app/trpc';
import { Input } from '../../shared/ui/Input';

export const SignUpPage = () => {
  const signUp = trpc.signUp.useMutation();
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const { formik, buttonProps } = useForm({
    initialValues: {
      telegram: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpInputZodSchema
      .extend({ confirmPassword: z.string().min(1) })
      .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
          });
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 1 });
      formik.resetForm();
      void trpcUtils.invalidate().then(async () => {
        await navigate(getViewAllUsersRoute());
      });
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
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
          />
          <Button {...buttonProps} type="submit">
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
};
