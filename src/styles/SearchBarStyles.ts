import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// apply pointer cursor
export const StyledTextField = styled(TextField)(({ theme }) => ({
  fontWeight: "400",
  letterSpacing: "1px",
  cursor: "pointer",
  width: "100%",
  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    color: "var(--gray)",
    letterSpacing: "1px",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
    },
    border: "none",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "var(--white)",
  },
}));
