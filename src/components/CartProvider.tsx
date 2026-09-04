"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";
import { getProduct, getUnitPrice } from "@/lib/products";

const STORAGE_KEY = "mobile-store-cart-v1";

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string, storage: string) => void;
  updateQuantity: (
    productId: string,
    color: string,
    storage: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(a: CartItem, b: Pick<CartItem, "productId" | "color" | "storage">) {
  return (
    a.productId === b.productId && a.color === b.color && a.storage === b.storage
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => sameLine(p, item));
      if (idx >= 0) {
        const next = [...prev];
        const product = getProduct(item.productId);
        const max = product?.stock ?? 99;
        next[idx] = {
          ...next[idx],
          quantity: Math.min(max, next[idx].quantity + item.quantity),
        };
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback(
    (productId: string, color: string, storage: string) => {
      setItems((prev) =>
        prev.filter((p) => !sameLine(p, { productId, color, storage })),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, color: string, storage: string, quantity: number) => {
      setItems((prev) =>
        prev
          .map((p) => {
            if (!sameLine(p, { productId, color, storage })) return p;
            const product = getProduct(productId);
            const max = product?.stock ?? 99;
            return { ...p, quantity: Math.min(max, Math.max(0, quantity)) };
          })
          .filter((p) => p.quantity > 0),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of items) {
      const product = getProduct(item.productId);
      if (!product) continue;
      count += item.quantity;
      sum += getUnitPrice(product, item.storage) * item.quantity;
    }
    return { itemCount: count, subtotal: Math.round(sum * 100) / 100 };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      ready,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [
      items,
      ready,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
