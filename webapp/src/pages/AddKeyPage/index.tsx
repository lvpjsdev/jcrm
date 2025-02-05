import { addKeyZodSchema } from '@jcrm/backend/src/routes/keys/addKey/input';
import { Alert, Button, Textarea } from '@mantine/core';
import { useForm } from '../../app/form';
import { trpc } from '../../app/trpc';
import { Input } from '../../shared/ui/Input';

export const AddKeyPage = () => {
  const addKey = trpc.addKey.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: '',
      key: '',
    },
    onSubmit: async (values) => {
      await addKey.mutateAsync({ ...values, key: values.key.trim() });
    },
    validationSchema: addKeyZodSchema,
    resetOnSuccess: true,
  });

  return (
    <section>
      <h1>Add key</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          label="Key name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          disabled={formik.isSubmitting}
        />
        <Textarea
          name="key"
          label="Key"
          onChange={formik.handleChange}
          value={formik.values.key}
          error={formik.errors.key}
          disabled={formik.isSubmitting}
        />
        <Button {...buttonProps} type="submit">
          {'Add key'}
        </Button>
        <Alert {...alertProps} />
      </form>
    </section>
  );
};
