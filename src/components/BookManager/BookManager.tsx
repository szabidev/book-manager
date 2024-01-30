import { Formik } from "formik";
import { KeyedMutator } from "swr";

import { ThemeProvider } from "@mui/material";
import BookFormFields from "../Forms/BookFormFields/BookFormFields";
import { Book } from "../BookList/BookList";
import { AddNewBookBtn, colorTheme } from "../../styles/BookFormFieldsStyle";
import "./BookManager.css";
import { addBook } from "../../helpers/requests";

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

  const addNewBook = async (values: Book) => {
    console.log("function");
    try {
      const newBook: Book = { ...values, id: Date.now() };
      const response = await addBook(newBook);
      console.log("Book added:", response);
      mutateBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => addNewBook(values)}
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
  );
};

export default BookManager;
