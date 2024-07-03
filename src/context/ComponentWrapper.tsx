import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { useThemeContext } from "./ThemeProvider";

export const ComponentWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
