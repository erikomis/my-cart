import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

type CartProps = {
  cartFormatted: {
    precoFormatado: string;
    subTotal: string;
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
  }[];
  total: string;
  handleProductDecrement: (product: {
    precoFormatado: string;
    subTotal: string;
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
  }) => void;
  handleProductIncrement: (product: {
    precoFormatado: string;
    subTotal: string;
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
  }) => void;
  handleRemoveProduct: (id: number) => void;
};

export const Cart = ({
  cartFormatted,
  total,
  handleProductDecrement,
  handleProductIncrement,
  handleRemoveProduct,
}: CartProps) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PRODUTO</TableCell>
            <TableCell>QTD</TableCell>
            <TableCell>SUBTOTAL</TableCell>
            <TableCell>
              <DeleteIcon fontSize="small" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartFormatted.map((product) => (
            <TableRow key={product.id} data-testid="product">
              <TableCell>
                <Typography variant="body1">
                  <strong>{product.nome}</strong>
                </Typography>
                <Typography variant="body2">
                  {product.precoFormatado}
                </Typography>
              </TableCell>
              <TableCell>
                <Grid container alignItems="center">
                  <IconButton
                    aria-label="decrement"
                    data-testid="decrement-product"
                    disabled={product.quantidade <= 1}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.quantidade}
                    style={{ width: "40px", textAlign: "center" }}
                  />
                  <IconButton
                    aria-label="increment"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  <strong>{product.subTotal}</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="remove"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <footer>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
          }}
        >
          Finalizar pedido
        </Button>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography variant="body1">TOTAL</Typography>
          <Typography variant="h6" sx={{ ml: 2 }}>
            {total}
          </Typography>
        </Grid>
      </footer>
    </Paper>
  );
};
