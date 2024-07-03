import { Theme } from "@mui/material";
import { IThemeConfigProps } from "../styles/themes";

export type ThemeContextType = {
  toggleMode: () => void;
  config?: IThemeConfigProps;
  theme: Theme;
};
