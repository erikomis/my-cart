import { ReactNode } from "react";
import { Item } from "./items";

export interface CartProviderProps {
  children: ReactNode;
}

export interface CartItemsAmount {
  [key: number]: number;
}

export interface ProductFormatted extends Item {
  precoFormatado: string;
}

export interface UpdateProductAmount {
  productId: number;
  amount: number;
}

export interface CartContextData {
  cart: Item[];
  products: ProductFormatted[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}
