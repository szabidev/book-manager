import { useEffect, useState } from "react";

import {
  Button,
  CardContent,
  FormGroup,
  Checkbox,
  Divider,
  IconButton,
  Modal,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";

import {
  StyledCard,
  StyledCardActions,
  StyledCardHeader,
  StyledFormControlLabel,
  StyledModalCard,
  StyledModalCardActions,
} from "../../styles/BookListItemStyles";
import { Book } from "../../helpers/interfaces";
import { mutate } from "swr";

interface BookListItemProps {
  bookItem: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number | null) => void;
  onFavorit: (book: Book) => void;
  isSelected: boolean;
  setSelectedBookId: (id: number | null) => void;
  favoriteBooks: Book[];
}

const BookListItem = ({
  bookItem,
  onEdit,
  onDelete,
  onFavorit,
  isSelected,
  setSelectedBookId,
  favoriteBooks,
}: BookListItemProps) => {
  const [isChecked, setChecked] = useState<boolean>(
    localStorage.getItem(`readStatus_${bookItem.id}`) === "true"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(bookItem.title);
  const [editedAuthor, setEditedAuthor] = useState<string>(bookItem.author);
  const [editedDescription, setEditedDescription] = useState<string>(
    bookItem.description
  );
  const [editedGenre, setEditedGenre] = useState<string>(bookItem.genre);
  const [isRead, setIsRead] = useState<boolean>(false);

  const isBookFavorited = favoriteBooks.some(
    (favBook) => favBook.id === bookItem.id
  );

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
    setIsRead(!isRead);
    localStorage.setItem(`readStatus_${bookItem.id}`, (!isChecked).toString());
    setSelectedBookId(bookItem.id);
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
      genre: editedGenre,
    };
    onEdit(updatedBook);
    mutate("/books");
  };

  const handleDelete = () => {
    setIsModalOpen(false);
    onDelete(bookItem.id);
    mutate("/books");
  };

  useEffect(() => {
    const isReadStatus = localStorage.getItem(`readStatus_${bookItem.id}`);
    if (isReadStatus !== null) {
      setChecked(isReadStatus === "true");
    }
  }, [bookItem.id]);

  return (
    <>
      <StyledCard>
        <StyledCardHeader
          title={
            <>
              {bookItem.title}
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                onClick={handleOpenModal}
                sx={{ cursor: "pointer" }}
              >
                <EditIcon />
                <Typography variant="body1">Edit</Typography>
              </Stack>
            </>
          }
          subheader={
            <>
              {bookItem.author}
              {` - ${bookItem.genre}`}
              <p></p>
            </>
          }
        />
        <CardContent>
          <Typography>{bookItem.description}</Typography>
        </CardContent>
        <StyledCardActions disableSpacing>
          <IconButton
            aria-label="favorit"
            onClick={(e) => {
              e.stopPropagation();
              onFavorit(bookItem);
            }}
          >
            <FavoriteIcon color={`${isBookFavorited ? "error" : "action"}`} />
          </IconButton>
          <FormGroup>
            <StyledFormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  sx={{ marginRight: "10px" }}
                />
              }
              label={isRead ? "Unread" : "Read"}
            />
          </FormGroup>
        </StyledCardActions>
      </StyledCard>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          "@media screen and (max-height:500px)": {
            overflowY: "auto",
          },
        }}
      >
        <StyledModalCard>
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
