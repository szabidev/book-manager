import { Link as RouterLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";

export const StyledAppBar = styled(AppBar)(() => ({
  position: "static",
  width: "100%",
  height: "92px",
  borderBottom: "2px solid var(--gray)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  "@media screen and (max-width:768px)": {
    height: "150px",
    flexDirection: "column-reverse",
  },
}));

export const StyledLink = styled(RouterLink)(() => ({
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

// use styled for responsiveness
