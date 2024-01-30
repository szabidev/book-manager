import { createContext, ReactNode, useContext, useState } from "react";

interface StatusContextProps {
  children: ReactNode;
}

// interface StatusProviderProps {
//   children: ReactNode;
// }

interface StatusBarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

const StatusContext = createContext<
  | {
      statusBar: StatusBarProps;
      setStatusBar: React.Dispatch<React.SetStateAction<StatusBarProps>>;
    }
  | undefined
>(undefined);

const StatusProvider = ({ children }: StatusContextProps) => {
  const [statusBar, setStatusBar] = useState<StatusBarProps>({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <StatusContext.Provider value={{ statusBar, setStatusBar }}>
      {children}
    </StatusContext.Provider>
  );
};

const useStatus = () => {
  const context = useContext(StatusContext);

  if (!context) {
    throw new Error("useStatus must be used within a StatusProvider");
  }

  return context;
};

export { StatusProvider, useStatus };
