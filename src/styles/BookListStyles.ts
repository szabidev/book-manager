import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

export const StyledList = styled(List)(() => ({
  width: "800px",
  height: "79vh",
  margin: "65px auto 10px auto",
  backgroundColor: "var(--white)",
  borderRadius: 2,
  opacity: 0.75,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    marginTop: 0.5,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.3)",
    borderRadius: "12px",
  },
  "@media screen and (max-width:768px)": {
    width: "90%",
  },
}));
