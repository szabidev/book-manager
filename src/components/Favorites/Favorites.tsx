import { Typography, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import StatusBar from "../UI/StatusBar/StatusBar";
import { StyledCard, StyledCardHeader } from "../../styles/BookListItemStyles";
import { StyledList } from "../../styles/BookListStyles";
import { Book } from "../../helpers/interfaces";
import { useStatus } from "../../shared/StatusContext";
import "../../shared/variables.css";

interface FavoritesProps {
  favoriteBooks: Book[];
  onRemove: (book: Book) => void;
}

const Favorites = ({ favoriteBooks, onRemove }: FavoritesProps) => {
  const { statusBar, setStatusBar } = useStatus();

  const handleFavoriteRemove = (favorit: Book) => {
    onRemove(favorit);
    setStatusBar({
      open: true,
      message: "Removed from favorites.",
      severity: "error",
    });
  };

  return (
    <StyledCard sx={{ width: "70%", margin: "70px auto 0 auto" }}>
      <Typography variant="h3" align="center" mt={2}>
        Favorites
      </Typography>
      <StatusBar
        open={statusBar.open}
        message={statusBar.message}
        severity={statusBar.severity}
        onClose={() => setStatusBar({ ...statusBar, open: false })}
      />
      <StyledList>
        {favoriteBooks.length !== 0 ? (
          favoriteBooks.map((favorite) => (
            <StyledCardHeader
              key={favorite.id}
              sx={{
                border: "1px solid gray",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
              title={
                <>
                  {favorite.title}
                  <Stack
                    onClick={() => handleFavoriteRemove(favorite)}
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "var(--error)" },
                    }}
                  >
                    <CancelIcon />
                    <Typography variant="body1">Remove</Typography>
                  </Stack>
                </>
              }
              subheader={`${favorite.author} - ${favorite.genre}`}
            />
          ))
        ) : (
          <Typography variant="body2" align="center">
            No Favorites
          </Typography>
        )}
      </StyledList>
    </StyledCard>
  );
};

export default Favorites;
