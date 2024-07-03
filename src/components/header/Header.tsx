import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ height: "70px", bgcolor: "gray" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          component={Link}
          to="/"
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          Produtos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
