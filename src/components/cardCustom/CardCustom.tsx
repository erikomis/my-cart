import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartItemsAmount, ProductFormatted } from "../../types/cart";

export const CardCustom = ({
  product,
  handleAddProduct,
  cartItemsAmount,
  isDetail,
}: {
  product: ProductFormatted;
  handleAddProduct: (id: number) => void;
  cartItemsAmount: CartItemsAmount;
  isDetail?: boolean;
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {product.nome}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Preço: {product.precoFormatado}
        </Typography>

        {isDetail && (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            {product.descricao}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {isDetail ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddProduct(product.id)}
          >
            Adicionar ao Carrinho ({cartItemsAmount[product.id] || 0})
          </Button>
        ) : (
          <>
            <Button
              component={Link}
              to={"/produto-detail/" + product.id}
              variant="outlined"
              color="primary"
            >
              Ver Detalhes
            </Button>
            <IconButton
              color="primary"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
            >
              <AddShoppingCartIcon />
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                {cartItemsAmount[product.id] || 0}
              </Typography>
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};
