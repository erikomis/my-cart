import { useCallback, useEffect, useMemo, useState } from "react";
import { itemsParaCompra } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { Container, Typography } from "@mui/material";
import { CardCustom } from "../../components/cardCustom/CardCustom";
import { useCart } from "../../context/cart";
import { CartItemsAmount, ProductFormatted } from "../../types/cart";
import { formatPrice } from "../../utils/format";
import { useModal } from "../../hooks/useModal";
import { Cart } from "../../components/cart/Cart";
import Modal from "../../components/modal/Modal";

export const ProductDetail = () => {
  const [product, setProduct] = useState<ProductFormatted>(
    {} as ProductFormatted
  );
  const { handleClose, handleOpen, open } = useModal();
  const { addProduct, cart, updateProductAmount, removeProduct } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddProduct = useCallback(
    (id: number) => {
      addProduct(id);
    },
    [addProduct]
  );

  const handleExists = useCallback(() => {
    const productExists = itemsParaCompra.find(
      (product) => product.id === Number(id)
    );
    if (!productExists) {
      navigate("/404");
      return;
    }

    setProduct({
      ...productExists,
      precoFormatado: formatPrice(productExists.preco),
    });
  }, [id, navigate]);

  const cartItemsAmount = useMemo(() => {
    return cart.reduce((sumAmount, product) => {
      const newSumAmount = { ...sumAmount };
      newSumAmount[product.id] = product.quantidade;
      return newSumAmount;
    }, {} as CartItemsAmount);
  }, [cart]);

  useEffect(() => {
    handleExists();
  }, [handleExists]);

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
      <Typography variant="h3" gutterBottom>
        Detalhes do Produto
      </Typography>
      <CardCustom
        product={product}
        handleAddProduct={handleAddProduct}
        cartItemsAmount={cartItemsAmount}
        isDetail
      />
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
