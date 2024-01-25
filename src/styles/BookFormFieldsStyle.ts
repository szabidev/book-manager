import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextField } from "formik-mui";

export const StyledBox = styled(Box)(() => ({
  border: "1px solid var(--gray)",
  borderRadius: "4px",
  width: "700px",
  margin: "100px auto",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  margin: "15px 0",
  outline: "none",
}));
