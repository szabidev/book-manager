import { useState } from "react";

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, IconButton, Modal, Typography } from "@mui/material";

import { StyledCard, StyledCardActions } from "../../styles/BookListItemStyles";
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

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleFavorit = () => {
    setIsFavorit(!isFavorit);
  };

  const handleEditClick = () => {
    // Open the modal on edit button click
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    // Close the modal after editing
    setIsModalOpen(false);
    // Call the onEdit callback with the updated book details
    onEdit(bookItem);
    mutate("/books");
  };

  const handleDelete = () => {
    setIsModalOpen(false);
    onDelete(bookItem.id);
    mutate("/books");
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledCard onClick={handleEditClick}>
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
        <div>
          <Typography variant="h4">{bookItem.title}</Typography>
          <Typography variant="subtitle1">{bookItem.author}</Typography>
          <Typography variant="body1">{bookItem.description}</Typography>

          <Button onClick={handleEdit} variant="outlined">
            Edit
          </Button>
          <Button onClick={handleDelete} variant="outlined">
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default BookListItem;
