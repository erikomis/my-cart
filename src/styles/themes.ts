import { createTheme } from "@mui/material";

export interface IThemeConfigProps {
  mode: "light" | "dark";
}

export const themeConfig = (config?: IThemeConfigProps) => {
  const isDark = config?.mode === "dark";

  return createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border: isDark ? "1px solid #313234" : "1px solid #E0E0E0",
            boxShadow: isDark
              ? "0px 4px 4px rgba(0, 0, 0, 0.25)"
              : "0px 4px 4px rgba(0, 0, 0, 0.10)",
          },
        },
      },
    },
    palette: {
      mode: config?.mode || "light",
      primary: {
        light: "#11B0C8",
        main: "#11B0C8",
        dark: "#11B0C8",
        contrastText: "#fff",
      },
      secondary: {
        light: "#313234",
        main: "#313234",
        dark: "#313234",
        contrastText: "#fff",
      },
      background: {
        default: isDark ? "#1E1E20" : "#f1f1f1",
        paper: isDark ? "#313234" : "#FFFFFF",
      },
    },
  });
};
