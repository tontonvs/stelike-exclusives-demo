import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types";

interface ProductOverlayContextValue {
  activeProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
}

const ProductOverlayContext = createContext<
  ProductOverlayContextValue | undefined
>(undefined);

export function ProductOverlayProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <ProductOverlayContext.Provider
      value={{
        activeProduct,
        openProduct: setActiveProduct,
        closeProduct: () => setActiveProduct(null),
      }}
    >
      {children}
    </ProductOverlayContext.Provider>
  );
}

export function useProductOverlay(): ProductOverlayContextValue {
  const ctx = useContext(ProductOverlayContext);
  if (!ctx) {
    throw new Error(
      "useProductOverlay must be used within a ProductOverlayProvider"
    );
  }
  return ctx;
}
