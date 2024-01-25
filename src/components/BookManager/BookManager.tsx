import { Formik } from "formik";
import BookFormFields from "../Forms/BookFormFields/BookFormFields";

const BookManager = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => console.log("formik")}>
      <BookFormFields />
    </Formik>
  );
};

export default BookManager;
