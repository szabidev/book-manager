import { TextField } from "formik-mui";
import { Box, Button, createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)(() => ({
  border: "1px solid var(--gray)",
  borderRadius: "4px",
  width: "700px",
  margin: "50px auto",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  margin: "20px 0",
  outline: "none",

  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
    letterSpacing: "1px",
  },
}));

export const AddNewBookBtn = styled(Button)(() => ({
  width: 200,
  color: "white",

  "& .MuiButton-root": {
    borderColor: "#E0E3E7",
  },
  "& .MuiButton-containedPrimary": {
    backgroundColor: "red",
  },
}));

export const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#6F7E8C",
    },
  },
});
