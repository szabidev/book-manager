import { Alert, Snackbar } from "@mui/material";

import { StatusBarProps } from "../../../helpers/interfaces";

const StatusBar = ({ open, onClose, message, severity }: StatusBarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default StatusBar;
