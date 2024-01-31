import { Typography } from "@mui/material";

import BookListItem from "../BookListItem/BookListItem";

import { StyledList } from "../../styles/BookListStyles";
import { Book } from "../../helpers/interfaces";
import "../../shared/variables.css";

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
  favoriteBooks,
}: BookListProps) => {
  const handleFavorit = (book: Book) => {
    onFavorit(book);
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
