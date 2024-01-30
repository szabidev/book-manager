import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSWR, { mutate } from "swr";

import { ThemeProvider, Typography } from "@mui/material";
import Header from "./components/UI/Header/Header";
import Loading from "./components/UI/Loading/Loading";
import Favorites from "./components/Favorites/Favorites";
import BookManager from "./components/BookManager/BookManager";
import BookList from "./components/BookList/BookList";
import { Book } from "./helpers/interfaces";

import { deleteBook, getAllBooks, updateBook } from "./helpers/requests";
import { loadingColorTheme } from "./styles/LoadingStyles";

function App() {
  const { data: books, error } = useSWR<Book[], Error>("/books", getAllBooks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [isFavorit, setIsFavorit] = useState<boolean>(false);

  const filteredBooks = books
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleSearchReset = () => {
    setSearchTerm("");
  };

  const listFavorites = (book: Book) => {
    if (!favoriteBooks.some((favBook) => favBook.id === book.id)) {
      setFavoriteBooks((prevFavoriteBooks) => [...prevFavoriteBooks, book]);
    } else {
      setFavoriteBooks((prevFavoriteBooks) =>
        prevFavoriteBooks.filter((favBook) => favBook.id !== book.id)
      );
    }
  };

  const handleEdit = async (book: Book) => {
    try {
      await updateBook(book.id!, book);
      mutate("/books");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      mutate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <ThemeProvider theme={loadingColorTheme}>
            <Loading />
          </ThemeProvider>
        }
      >
        <div className="background"></div>
        <div className="app__container">
          <Header
            onSearchSubmit={handleSearchSubmit}
            onReset={handleSearchReset}
          />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {error ? (
                  <Typography
                    variant="h2"
                    align="center"
                    marginTop="calc(50% - 66px)"
                    color="var(--gray)"
                    letterSpacing="2px"
                  >
                    Error loading books. Please try again
                  </Typography>
                ) : (
                  <>
                    {filteredBooks.length > 0 ? (
                      <BookList
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onFavorit={listFavorites}
                        books={filteredBooks}
                        isFavorit={isFavorit}
                        setIsFavorit={setIsFavorit}
                        favoriteBooks={favoriteBooks}
                      />
                    ) : (
                      <Typography
                        variant="h2"
                        align="center"
                        marginTop="40vh"
                        color="var(--gray)"
                        letterSpacing="2px"
                      >
                        No books found.
                      </Typography>
                    )}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/favorit"
            element={
              <Favorites
                favoriteBooks={favoriteBooks}
                onRemove={listFavorites}
              />
            }
          />
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
