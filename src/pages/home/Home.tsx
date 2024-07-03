import { Container, Grid } from "@mui/material";
import { Header } from "../../components/header/Header";
import { CardCustom } from "../../components/cardCustom/CardCustom";
import { itemsParaCompra } from "../../utils/utils";

export const Home = () => {
  return (
    <Container>
      <Header />
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {itemsParaCompra.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <CardCustom product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
