import { Suspense, useState } from "react";
import Header from "./components/UI/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/UI/Loading/Loading";
import Favorites from "./components/Favorites/Favorites";
import BookManager from "./components/BookManager/BookManager";
import BookList from "./components/BookList/BookList";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchTerm(searchTerm);
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
          <Route path="/" element={<BookList />} />
          <Route path="/favorit" element={<Favorites />} />
          <Route path="/manager" element={<BookManager />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
