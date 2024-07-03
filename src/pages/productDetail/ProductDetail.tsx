import { useCallback, useEffect, useMemo, useState } from "react";
import { itemsParaCompra } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { Container } from "@mui/material";
import { CardCustom } from "../../components/cardCustom/CardCustom";
import { useCart } from "../../context/cart";
import { CartItemsAmount, ProductFormatted } from "../../types/cart";
import { formatPrice } from "../../utils/format";

export const ProductDetail = () => {
  const { addProduct, cart } = useCart();

  const [product, setProduct] = useState<ProductFormatted>(
    {} as ProductFormatted
  );
  const { id } = useParams();
  const handleExits = () => {
    const productExists = itemsParaCompra.find(
      (product) => product.id === Number(id)
    );
    if (!productExists) {
      return;
    }

    setProduct({
      ...productExists,
      precoFormatado: formatPrice(productExists.preco),
    });
  };

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

  useEffect(() => {
    handleExits();
  }, []);

  return (
    <Container>
      <Header />
      {product.id && (
        <CardCustom
          product={product}
          handleAddProduct={handleAddProduct}
          cartItemsAmount={cartItemsAmount}
          isDetail
        />
      )}
    </Container>
  );
};
