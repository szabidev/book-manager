import { useState } from "react";

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  StyledCard,
  StyledCardActions,
  StyledModalCard,
  StyledModalCardActions,
} from "../../styles/BookListItemStyles";
import { Book } from "../BookList/BookList";
import { mutate } from "swr";

interface BookListItemProps {
  bookItem: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number | null) => void;
}

const BookListItem = ({ bookItem, onEdit, onDelete }: BookListItemProps) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isFavorit, setIsFavorit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // for edit - delete it
  const [editedTitle, setEditedTitle] = useState<string>(bookItem.title);
  const [editedAuthor, setEditedAuthor] = useState<string>(bookItem.author);
  const [editedDescription, setEditedDescription] = useState<string>(
    bookItem.description
  );
  const [editedGenre, setEditedGenre] = useState<string>(bookItem.genre);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleFavorit = () => {
    setIsFavorit(!isFavorit);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(false);
    const updatedBook: Book = {
      ...bookItem,
      title: editedTitle,
      author: editedAuthor,
      description: editedDescription,
    };
    onEdit(updatedBook);
    mutate("/books");
  };

  const handleDelete = () => {
    setIsModalOpen(false);
    onDelete(bookItem.id);
    mutate("/books");
  };

  return (
    <>
      <StyledCard onClick={handleOpenModal}>
        <CardHeader
          title={bookItem.title}
          subheader={
            <>
              {bookItem.author}
              {` - ${bookItem.genre}`}
            </>
          }
        />
        <CardContent>
          <Typography>{bookItem.description}</Typography>
        </CardContent>
        <StyledCardActions disableSpacing>
          <IconButton aria-label="favorit" onClick={handleFavorit}>
            <FavoriteIcon color={`${isFavorit ? "error" : "action"}`} />
          </IconButton>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              }
              label="Read"
            />
          </FormGroup>
        </StyledCardActions>
      </StyledCard>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <StyledModalCard>
          {/* <Typography variant="h4">{bookItem.title}</Typography>
          <Typography variant="subtitle1">{bookItem.author}</Typography>
          <Typography variant="body1">{bookItem.description}</Typography> */}

          {/* Editable TextFields */}
          <TextField
            sx={{ margin: "15px 0" }}
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
          />
          <TextField
            sx={{ margin: "15px 0" }}
            label="Author"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            fullWidth
          />
          <TextField
            sx={{ margin: "15px 0" }}
            label="Genre"
            value={editedGenre}
            onChange={(e) => setEditedGenre(e.target.value)}
            fullWidth
          />
          <TextField
            sx={{ margin: "15px 0" }}
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            multiline
            fullWidth
          />

          <Divider light sx={{ margin: "10px 0" }} />
          <StyledModalCardActions>
            <Button
              onClick={handleEdit}
              variant="contained"
              color="warning"
              sx={{ width: 100 }}
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              sx={{ width: 100 }}
            >
              Delete
            </Button>
          </StyledModalCardActions>
        </StyledModalCard>
      </Modal>
    </>
  );
};

export default BookListItem;
