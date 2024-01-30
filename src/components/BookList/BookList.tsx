import BookListItem from "../BookListItem/BookListItem";

import { Typography } from "@mui/material";
import { StyledList } from "../../styles/BookListStyles";
import { Book } from "../../helpers/interfaces";
import "../../shared/variables.css";
import { useState } from "react";

interface BookListProps {
  books: Book[];
  favoriteBooks: Book[];
  isFavorit: boolean;
  setIsFavorit: (isFavorit: boolean) => void;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  onFavorit: (book: Book) => void;
}

const BookList = ({
  books,
  onEdit,
  onDelete,
  onFavorit,
  // isFavorit,
  // setIsFavorit,
  favoriteBooks,
}: BookListProps) => {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const handleFavorit = (book: Book) => {
    onFavorit(book);

    if (!favoriteBooks.some((favBook) => favBook.id === book.id)) {
      setSelectedBookId(book.id);
    } else {
      setSelectedBookId(null);
    }
  };

  return (
    <div className="book__list">
      <StyledList>
        {books.length !== 0 ? (
          books.map((book) => (
            <BookListItem
              key={book.id}
              bookItem={book}
              onEdit={onEdit}
              onDelete={() => onDelete(book.id!)}
              onFavorit={() => handleFavorit(book)}
              isSelected={selectedBookId === book.id}
              setSelectedBookId={setSelectedBookId}
              favoriteBooks={favoriteBooks}
            />
          ))
        ) : (
          <Typography variant="h3" align="center" marginTop="calc(50% - 56px)">
            No books in the library
          </Typography>
        )}
      </StyledList>
    </div>
  );
};

export default BookList;
