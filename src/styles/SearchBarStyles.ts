import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import "../shared/variables.css";

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid var(--gray)",
  margin: "0 10px ",
  "@media screen and (max-width:768px)": {
    border: "none",
  },
}));

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
  "@media screen and (min-width:420px and max-width:768px)": {
    width: "50%",
  },
}));
