import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";

import { styled } from "@mui/material/styles";
import { FormControlLabel } from "@mui/material";

export const StyledCard = styled(Card)(() => ({
  margin: "10px 0",
  cursor: "pointer",
}));

export const StyledCardHeader = styled(CardHeader)(() => ({
  "& .MuiTypography-root": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const StyledCardActions = styled(CardActions)(() => ({
  padding: 0,
  width: 200,
  display: "flex",
  justifyContent: "space-evenly",
}));

export const StyledModalCard = styled(Card)(() => ({
  width: "50%",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "20px 40px",
  maxHeight: "80vh",
  "@media screen and (max-height:500px)": {
    overflowY: "auto",
  },
}));

export const StyledModalCardActions = styled(CardActions)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
}));

export const StyledModalTextField = styled(TextField)(() => ({
  margin: "15px 0",
}));

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  "& .MuiTypography-body1": {
    width: "30px",
    textAlign: "end",
  },
}));
