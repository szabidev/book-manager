import { Form, useFormik } from "formik";
import * as Yup from "yup";

import { Button, Grid } from "@mui/material";

import BookFormFields from "../BookFormFields/BookFormFields";

interface FormValues {
  title: string;
  author: string;
  description: string;
  genre: string;
  id?: string;
}

interface BookFormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
}

const BookForm = ({ initialValues, onSubmit }: BookFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      description: Yup.string().required("Description is required"),
      genre: Yup.string().required("Genre is required"),
      // id?
      //   url: Yup.string().url("Invalid URL"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <BookFormFields isSubmitting={formik.isSubmitting} />
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default BookForm;
