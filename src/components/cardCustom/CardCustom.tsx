import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { Item } from "../../types/items";

export const CardCustom = ({ product }: { product: Item }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {product.nome}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Preço: {product.preco}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={"/produto-detail/" + product.id}
          variant="outlined"
          color="primary"
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};
