import { Container, Grid } from "@mui/material";
import { Header } from "../../components/header/Header";
import { CardCustom } from "../../components/cardCustom/CardCustom";
import { useCart } from "../../context/cart";
import { CartItemsAmount } from "../../types/cart";
import { useCallback, useMemo } from "react";

export const Home = () => {
  const { addProduct, cart, products } = useCart();

  const cartItemsAmount = useMemo(() => {
    return cart?.reduce((sumAmount, product) => {
      const newSumAmount = { ...sumAmount };
      newSumAmount[product.id] = product.quantidade;
      return newSumAmount;
    }, {} as CartItemsAmount);
  }, [cart]);

  const handleAddProduct = useCallback(
    (id: number) => {
      addProduct(id);
    },
    [addProduct]
  );

  return (
    <Container>
      <Header />
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <CardCustom
              product={product}
              handleAddProduct={handleAddProduct}
              cartItemsAmount={cartItemsAmount}
              isDetail={false}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
