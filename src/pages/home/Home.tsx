import { Container, Grid } from "@mui/material";
import { Header } from "../../components/header/Header";
import { CardCustom } from "../../components/cardCustom/CardCustom";
import { useCart } from "../../context/cart";
import { CartItemsAmount, ProductFormatted } from "../../types/cart";
import { useCallback, useMemo } from "react";
import Modal from "../../components/modal/Modal";
import { useModal } from "../../hooks/useModal";
import { Cart } from "../../components/cart/Cart";
import { formatPrice } from "../../utils/format";

export const Home = () => {
  const { addProduct, cart, products, removeProduct, updateProductAmount } =
    useCart();
  const { open, handleClose, handleOpen } = useModal();

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
  const cartFormatted = useMemo(() => {
    return cart.map((product) => ({
      ...product,
      precoFormatado: formatPrice(product.preco),
      subTotal: formatPrice(product.preco * product.quantidade),
    }));
  }, [cart]);

  const total = useMemo(() => {
    return formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.preco * product.quantidade;
      }, 0)
    );
  }, [cart]);

  const handleProductIncrement = useCallback(
    (product: ProductFormatted) => {
      updateProductAmount({
        productId: product.id,
        amount: product.quantidade + 1,
      });
    },
    [updateProductAmount]
  );

  const handleProductDecrement = useCallback(
    (product: ProductFormatted) => {
      updateProductAmount({
        productId: product.id,
        amount: product.quantidade - 1,
      });
    },
    [updateProductAmount]
  );

  const handleRemoveProduct = useCallback(
    (productId: number) => {
      removeProduct(productId);
    },
    [removeProduct]
  );
  return (
    <Container>
      <Header handleOpenCart={handleOpen} />
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

      {open && (
        <Modal
          open={open}
          handleCloseModal={handleClose}
          title="Carrinho"
          maxWidth="md"
          isTitleCenter
        >
          <Cart
            cartFormatted={cartFormatted}
            handleProductDecrement={handleProductDecrement}
            handleProductIncrement={handleProductIncrement}
            handleRemoveProduct={handleRemoveProduct}
            total={total}
          />
        </Modal>
      )}
    </Container>
  );
};
