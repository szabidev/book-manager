import { createTheme, styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)(() => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "#6F7E8C",
}));

export const loadingColorTheme = createTheme({
  palette: {
    primary: {
      main: "#6F7E8C",
    },
  },
});
