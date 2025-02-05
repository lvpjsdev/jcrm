/* eslint-disable complexity */
import type { AlertProps, ButtonProps } from '@mantine/core';
import { useFormik, type FormikHelpers } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useMemo, useState } from 'react';
import type { z } from 'zod';

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues = {},
  validationSchema,
  onSubmit,
}: {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit: (
    values: z.infer<TZodSchema>,
    actions: FormikHelpers<z.infer<TZodSchema>>
  ) => Promise<void>;
}) => {
  const [submittingError, setSubmittingError] = useState<Error | null>(null);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, actions) => {
      try {
        setSubmittingError(null);
        await onSubmit(values, actions);

        if (resetOnSuccess) {
          formik.resetForm();
        }

        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        setSubmittingError(error as Error);
      }
    },
  });

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        color: 'red',
        title: 'Error',
        children: submittingError.message,
      };
    }

    if (showValidationAlert && !!formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        color: 'yellow',
        title: 'Validation Error',
        children: 'Please check the form for errors and try again.',
      };
    }

    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        color: 'green',
        title: 'Success',
        children: successMessage,
      };
    }

    return {
      hidden: true,
    };
  }, [
    submittingError,
    showValidationAlert,
    successMessage,
    successMessageVisible,
    formik.isValid,
    formik.submitCount,
  ]);

  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(
    () => ({
      loading: formik.isSubmitting,
    }),
    [formik.isSubmitting]
  );

  return {
    formik,
    alertProps,
    buttonProps,
  };
};
