import React from "react";
import { Alert, Snackbar } from "@mui/material";

type Severity = "success" | "warning" | "error" | "info";

export interface StatusBarProps {
  open: boolean;
  onClose?: () => void;
  message: string;
  severity: Severity;
}

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
