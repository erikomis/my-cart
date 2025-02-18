import { createContext, useContext, useState } from "react";
import {
  CartContextData,
  CartProviderProps,
  ProductFormatted,
  UpdateProductAmount,
} from "../types/cart";
import { estoque, itemsParaCompra } from "../utils/utils";
import { Item } from "../types/items";
import { formatPrice } from "../utils/format";
import { useNotification } from "./NotificationContext";

const CartContext = createContext<CartContextData>({} as CartContextData);

const LOCAL_STORAGE_KEY = "@my-cart:cart";
export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const { showNotification } = useNotification();
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
        showNotification("Produto não encontrado no estoque");
        return;
      }

      const currentAmount = productExists ? productExists.quantidade : 0;
      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        showNotification("Quantidade solicitada fora de estoque");
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
      showNotification("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = cart.filter((product) => product.id !== productId);

      if (updatedCart.length === cart.length)
        throw new Error("Produto não encontrado no carrinho");

      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    } catch (error) {
      showNotification("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) return;

      const stockAmount = estoque.find(
        (product) => product.id === productId
      )?.quantia;

      if (!stockAmount) {
        showNotification("Produto não encontrado no estoque");
        return;
      }

      if (amount > stockAmount) {
        showNotification("Quantidade solicitada fora de estoque");
        return;
      }

      const updatedCart = [...cart];
      const product = updatedCart.find((product) => product.id === productId);

      if (!product) throw new Error("Produto não encontrado no carrinho");

      product.quantidade = amount;
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    } catch (error) {
      showNotification("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addProduct,
        removeProduct,
        updateProductAmount,
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
