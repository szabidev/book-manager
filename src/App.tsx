import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSWR from "swr";

import { ThemeProvider, Typography } from "@mui/material";
import Header from "./components/UI/Header/Header";
import Loading from "./components/UI/Loading/Loading";
import Favorites from "./components/Favorites/Favorites";
import BookManager from "./components/BookManager/BookManager";
import BookList from "./components/BookList/BookList";
import { Book } from "./helpers/interfaces";

import { deleteBook, getAllBooks, updateBook } from "./helpers/requests";
import { loadingColorTheme } from "./styles/LoadingStyles";
import StatusBar, { StatusBarProps } from "./components/UI/StatusBar/StatusBar";
import { StatusProvider } from "./shared/StatusContext";

function App() {
  const {
    data: books,
    error,
    mutate,
  } = useSWR<Book[], Error>("/books", getAllBooks);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [isFavorit, setIsFavorit] = useState<boolean>(false);
  const [statusBar, setStatusBar] = useState<StatusBarProps>({
    open: false,
    message: "",
    severity: "success",
  });

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

      setStatusBar({
        open: true,
        message: "Book added to favorites!",
        severity: "success",
      });
    } else {
      setFavoriteBooks((prevFavoriteBooks) =>
        prevFavoriteBooks.filter((favBook) => favBook.id !== book.id)
      );

      setStatusBar({
        open: true,
        message: "Book removed from favorites!",
        severity: "info",
      });
    }
  };

  const handleEdit = async (book: Book) => {
    try {
      await updateBook(book.id!, book);
      mutate();
      setStatusBar({
        open: true,
        message: `${book.title} - ${book.author} updated successfully!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating book:", error);
      setStatusBar({
        open: true,
        message: "Error updating book. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      mutate();
      setStatusBar({
        open: true,
        message: "Book deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      setStatusBar({
        open: true,
        message: "Error deleting book. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseStatusBar = () => {
    // Close the status bar
    setStatusBar((prev) => ({ ...prev, open: false }));
  };

  return (
    <StatusProvider>
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
                  <StatusBar
                    open={statusBar.open}
                    message={statusBar.message}
                    severity={statusBar.severity}
                    onClose={handleCloseStatusBar}
                  />
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
    </StatusProvider>
  );
}

export default App;
