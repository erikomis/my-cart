import { Box, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../../context/ThemeProvider";

export const SwitchMode = (): JSX.Element => {
  const { config, toggleMode } = useThemeContext();

  return (
    <Box position={"fixed"} top={"10px"} right={"90px"}>
      <IconButton onClick={toggleMode}>
        {config?.mode === "dark" ? (
          <LightModeIcon />
        ) : (
          <DarkModeIcon color={"primary"} />
        )}
      </IconButton>
    </Box>
  );
};
