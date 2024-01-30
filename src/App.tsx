import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSWR, { mutate } from "swr";

import { ThemeProvider } from "@mui/material";
import Header from "./components/UI/Header/Header";
import Loading from "./components/UI/Loading/Loading";
import Favorites from "./components/Favorites/Favorites";
import BookManager from "./components/BookManager/BookManager";
import BookList, { Book } from "./components/BookList/BookList";

import { deleteBook, getAllBooks, updateBook } from "./helpers/requests";
import { loadingColorTheme } from "./styles/LoadingStyles";

function App() {
  const { data: books, error } = useSWR<Book[], Error>(
    "/books",
    getAllBooks,
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log(books);

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleEdit = async (book: Book) => {
    try {
      const response = await updateBook(book.id!, book);
      mutate("/books");
      console.log("Book updated:", response);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      mutate("/books");
      console.log("Book deleted:", id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  console.log(searchTerm);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <div className="background"></div>
        <div className="app__container">
          <Header onSearchSubmit={handleSearchSubmit} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {error ? (
                  <div>Error loading books. Please try again.</div>
                ) : (
                  <>
                    {books ? (
                      <BookList
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        books={books}
                      />
                    ) : (
                      <ThemeProvider theme={loadingColorTheme}>
                        <Loading />
                      </ThemeProvider>
                    )}
                  </>
                )}
              </>
            }
          />
          <Route path="/favorit" element={<Favorites />} />
          <Route
            path="/manager"
            element={<BookManager mutateBooks={mutate} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
