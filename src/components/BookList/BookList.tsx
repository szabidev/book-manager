import BookListItem from "../BookListItem/BookListItem";

import { StyledList } from "../../styles/BookListStyles";
import "../../shared/variables.css";

export interface Book {
  title: string;
  author: string;
  description: string;
  genre: string;
  id: number | null;
}

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList = ({ books, onEdit, onDelete }: BookListProps) => {
  return (
    <div className="book__list">
      <StyledList>
        {books ? (
          books.map((book) => (
            <BookListItem
              key={book.id}
              bookItem={book}
              onEdit={onEdit}
              onDelete={() => onDelete(book.id!)}
            />
          ))
        ) : (
          <p>No books available</p>
        )}
      </StyledList>
    </div>
  );
};

export default BookList;
