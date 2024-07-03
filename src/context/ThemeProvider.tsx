import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { IThemeConfigProps, themeConfig } from "../styles/themes";
import { ComponentWrapper } from "./ComponentWrapper";
import { ThemeContextType } from "../types/theme";

const initialTheme: IThemeConfigProps = {
  mode: "light",
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [config, setConfig] = useState<IThemeConfigProps | undefined>(
    initialTheme
  );

  const toggleMode = () => {
    let newMode: IThemeConfigProps["mode"] =
      config?.mode === "light" ? "dark" : "light";
    if (!config?.mode) newMode = "dark";
    localStorage.setItem("config:theme", JSON.stringify({ mode: newMode }));
    setConfig({ ...config, mode: newMode });
  };

  const theme = themeConfig(config);

  useEffect(() => {
    const localConfigTheme = localStorage.getItem("config:theme");
    if (localConfigTheme) {
      setConfig(JSON.parse(localConfigTheme || "{}"));
    } else {
      setConfig(initialTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleMode, config, theme }}>
      <ComponentWrapper>
        <>{children}</>
      </ComponentWrapper>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
