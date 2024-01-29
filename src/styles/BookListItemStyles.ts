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
