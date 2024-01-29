import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSWR, { mutate } from "swr";

import Header from "./components/UI/Header/Header";
import Loading from "./components/UI/Loading/Loading";
import Favorites from "./components/Favorites/Favorites";
import BookManager from "./components/BookManager/BookManager";
import BookList, { Book } from "./components/BookList/BookList";

import { deleteBook, getAllBooks, updateBook } from "./helpers/requests";

function App() {
  const { data: books, error } = useSWR<Book[], Error>("/books", getAllBooks, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log(books);

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleEdit = async (book: Book) => {
    try {
      const response = await updateBook(book.id!, book);
      mutate("/books"); // assuming mutateBooks is not needed here
      console.log("Book updated:", response);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      mutate("/books", true);
      console.log("Book deleted:", id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // if error return div with error loading  books component
  // if no books return Loading
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
              <BookList
                onEdit={handleEdit}
                onDelete={handleDelete}
                books={books || []}
              />
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
