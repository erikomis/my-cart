import { ReactNode } from "react";

export type Severity = "error" | "warning" | "info" | "success";

export interface NotificationContextType {
  showNotification: (message: string, severity?: Severity) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
}
