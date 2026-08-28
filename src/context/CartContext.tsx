import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import type { Product, CartItem } from "../types";

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, variantId?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number
  ) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function sameLine(
  item: CartItem,
  productId: string,
  variantId: string | undefined
) {
  return item.product.id === productId && item.variantId === variantId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product, variantId?: string) {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) =>
        sameLine(item, product.id, variantId)
      );
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { product, variantId, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string, variantId?: string) {
    setItems((prev) =>
      prev.filter((item) => !sameLine(item, productId, variantId))
    );
  }

  function updateQuantity(
    productId: string,
    variantId: string | undefined,
    quantity: number
  ) {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        sameLine(item, productId, variantId) ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const variant = item.product.variants?.find(
          (v) => v.id === item.variantId
        );
        const price = variant ? variant.price : item.product.price;
        return sum + price * item.quantity;
      }, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
