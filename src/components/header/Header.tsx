import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Header = ({ handleOpenCart }: { handleOpenCart: () => void }) => {
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
