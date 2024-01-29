import { Formik } from "formik";
import BookFormFields from "../Forms/BookFormFields/BookFormFields";
import { addBook, updateBook, deleteBook } from "../../helpers/requests";
import { Book } from "../BookList/BookList";
import { KeyedMutator } from "swr";
import Button from "@mui/material/Button";

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
      const response = await addBook(values);
      console.log("Book added:", response);
      mutateBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // const editBook = async (id: number, values: Book) => {
  //   try {
  //     const response = await updateBook(id, values);
  //     mutateBooks();
  //     console.log("Book updated:", response);
  //   } catch (error) {
  //     console.error("Error updating book:", error);
  //   }
  // };

  // const removeBook = async (id: number) => {
  //   try {
  //     await deleteBook(id);
  //     mutateBooks();
  //     console.log("Book deleted:", id);
  //   } catch (error) {
  //     console.error("Error deleting book:", error);
  //   }
  // };
  console.log("test");

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => addNewBook(values)}
    >
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <BookFormFields isSubmitting={isSubmitting} />
          <Button type="submit" variant="outlined" disabled={isSubmitting}>
            Add new book
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default BookManager;
