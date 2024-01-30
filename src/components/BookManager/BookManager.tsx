import { Formik, FormikHelpers } from "formik";
import { KeyedMutator } from "swr";

import { ThemeProvider, Typography } from "@mui/material";

import BookFormFields from "../Forms/BookFormFields/BookFormFields";
import { AddNewBookBtn, colorTheme } from "../../styles/BookFormFieldsStyle";
import { Book } from "../../helpers/interfaces";
import { addBook } from "../../helpers/requests";
import "./BookManager.css";
import "../../shared/variables.css";

const BookManager = ({
  mutateBooks,
}: {
  mutateBooks: KeyedMutator<Book[]>;
}) => {
  const initialValues: Book = {
    title: "",
    author: "",
    description: "",
    genre: "",
    id: null,
  };

  const addNewBook = async (
    values: Book,
    { resetForm }: FormikHelpers<Book>
  ) => {
    try {
      const newBook: Book = { ...values, id: Date.now() };
      await addBook(newBook);
      mutateBooks();
      resetForm();
    } catch (error) {
      console.error("Error adding book:", error);
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
    </>
  );
};

export default BookManager;
