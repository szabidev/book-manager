type Severity = "success" | "warning" | "error" | "info";
export interface Book {
  title: string;
  author: string;
  description: string;
  genre: string;
  id: number | null;
}

export interface StatusBarProps {
  open: boolean;
  onClose?: () => void;
  message: string;
  severity: Severity;
}
