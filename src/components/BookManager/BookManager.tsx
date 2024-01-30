import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { ThemeProvider, Typography } from "@mui/material";

import StatusBar from "../UI/StatusBar/StatusBar";
import BookFormFields from "../Forms/BookFormFields/BookFormFields";
import { AddNewBookBtn, colorTheme } from "../../styles/BookFormFieldsStyle";
import { Book } from "../../helpers/interfaces";
import { addBook } from "../../helpers/requests";
import { useStatus } from "../../shared/StatusContext";
import "./BookManager.css";
import "../../shared/variables.css";

const BookManager = ({
  mutateBooks,
}: {
  mutateBooks: () => Promise<Book[] | undefined>;
}) => {
  const initialValues: Book = {
    title: "",
    author: "",
    description: "",
    genre: "",
    id: null,
  };

  const { statusBar, setStatusBar } = useStatus();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    description: Yup.string().max(200).required("Description is required"),
    genre: Yup.string().required("Genre is required"),
  });

  const addNewBook = async (
    values: Book,
    { resetForm }: FormikHelpers<Book>
  ) => {
    try {
      const newBook: Book = { ...values, id: Date.now() };
      await addBook(newBook);
      await mutateBooks();
      resetForm();

      setStatusBar({
        open: true,
        message: `${newBook.title} - ${newBook.author} added successfully!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      setStatusBar({
        open: true,
        message: "Error adding new book.Please try again!",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Typography
        variant="h2"
        align="center"
        mt={2}
        color="var(--gray)"
        letterSpacing="2px"
      >
        Add a book
      </Typography>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => addNewBook(values, formikBag)}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="bookform">
            <BookFormFields isSubmitting={isSubmitting} />
            <ThemeProvider theme={colorTheme}>
              <AddNewBookBtn
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                color="primary"
              >
                Add new book
              </AddNewBookBtn>
            </ThemeProvider>
          </form>
        )}
      </Formik>
      <StatusBar
        open={statusBar.open}
        message={statusBar.message}
        severity={statusBar.severity}
        onClose={() => setStatusBar({ ...statusBar, open: false })}
      />
    </>
  );
};

export default BookManager;
