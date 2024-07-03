import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SwitchMode } from "../switchMode/SwitchMode";

export const Header = ({ handleOpenCart }: { handleOpenCart: () => void }) => {
  return (
    <AppBar position="static" sx={{ height: "70px", bgcolor: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          Produtos
        </Typography>

        <SwitchMode />
        <Box>
          <IconButton
            color="primary"
            data-testid="add-product-button"
            onClick={handleOpenCart}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
