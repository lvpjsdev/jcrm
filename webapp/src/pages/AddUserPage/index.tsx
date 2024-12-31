import { useFormik } from 'formik';

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
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
