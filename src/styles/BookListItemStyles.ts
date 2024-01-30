import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(() => ({
  margin: "10px 0",
  cursor: "pointer",
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
}));

export const StyledModalCardActions = styled(CardActions)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
}));

export const StyledModalTextField = styled(TextField)(() => ({
  margin: "15px 0",
}));
