import { FC } from "react";

import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import { Search, AutoStories } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";

import "../../../shared/variables.css";
import "./Header.css";

const styledAppBar = {
  width: "100%",
  //   check the height of the header / 82
  height: "92px",
  borderBottom: "2px solid var(--gray)",
  diplay: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space evenly",
};

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// apply pointer cursor
const StyledTextField = styled(TextField)(({ theme }) => ({
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

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  margin: "0 10px",
  fontSize: "20px",
  color: "var(--gray)",
  cursor: "pointer",
  fontWeight: 200,
  letterSpacing: "1px",
  "&:hover": {
    color: "var(--white)",
  },
}));

const Header: FC = () => {
  return (
    <AppBar sx={styledAppBar} color="transparent">
      <div className="search">
        <SearchIconWrapper>
          <Search sx={{ color: "var(--gray)" }} />
          <StyledTextField placeholder="Search…" focused />
        </SearchIconWrapper>
      </div>
      <div className="logo">
        <AutoStories sx={{ color: "var(--gray)", fontSize: 40 }} />
        <p className="logo__name">My Library</p>
      </div>
      <div className="menu__items">
        {/* maker routings */}
        <StyledLink className="item">Favorites</StyledLink>
        <StyledLink className="item">Book List</StyledLink>
        <StyledLink className="item">Book Manager</StyledLink>
      </div>
    </AppBar>
  );
};

export default Header;
