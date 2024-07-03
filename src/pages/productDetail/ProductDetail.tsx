import { useEffect, useState } from "react";
import { Item } from "../../types/items";
import { itemsParaCompra } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { Container } from "@mui/material";
import { CardCustom } from "../../components/cardCustom/CardCustom";

export const ProductDetail = () => {
  const [product, setProduct] = useState<Item>({} as Item);
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
    });
  };

  useEffect(() => {
    handleExits();
  }, []);

  return (
    <Container>
      <Header />
      {product.id && <CardCustom product={product} />}
    </Container>
  );
};
