import { createContext, useContext, useState } from "react";
import {
  CartContextData,
  CartProviderProps,
  ProductFormatted,
} from "../types/cart";
import { estoque, itemsParaCompra } from "../utils/utils";
import { Item } from "../types/items";
import { formatPrice } from "../utils/format";

const CartContext = createContext<CartContextData>({} as CartContextData);

const LOCAL_STORAGE_KEY = "@my-cart:cart";
export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [products] = useState<ProductFormatted[]>(
    itemsParaCompra.map((product) => ({
      ...product,
      precoFormatado: formatPrice(product.preco),
    })) as ProductFormatted[]
  );
  const [cart, setCart] = useState<Item[]>(() => {
    const storagedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storagedCart ? JSON.parse(storagedCart) : [];
  });

  const updateLocalStorage = (updatedCart: Item[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCart));
  };

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(
        (product) => product.id === productId
      );
      const stockAmount = estoque.find(
        (product) => product.id === productId
      )?.quantia;

      if (!stockAmount) {
        return;
      }

      const currentAmount = productExists ? productExists.quantidade : 0;
      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        return;
      }

      if (productExists) {
        productExists.quantidade = amount;
      } else {
        const product = products.find((product) => product.id === productId);
        if (!product) throw new Error("Produto não encontrado");

        updatedCart.push({ ...product, quantidade: 1 });
      }

      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextData => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
