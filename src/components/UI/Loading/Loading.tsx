import { Typography, CircularProgress } from "@mui/material";
import { StyledContainer } from "../../../styles/LoadingStyles";

const Loading = () => {
  return (
    <StyledContainer>
      <CircularProgress size="150px" />
      <Typography sx={{ fontSize: 60 }}>Loading...</Typography>
    </StyledContainer>
  );
};

export default Loading;
