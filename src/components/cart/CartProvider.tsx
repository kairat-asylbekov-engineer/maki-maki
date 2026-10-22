"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check } from "lucide-react";
import { priceOf, type Product } from "@/data/menu";

export type CartLine = { key: string; product: Product; option: number; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  hydrated: boolean;
  add: (product: Product, qty?: number, option?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "maki-maki-cart-v2";

const keyOf = (id: string, option: number) => `${id}#${option}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Демо-корзина хранится в браузере посетителя
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- восстановление состояния после гидрации
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  const add = useCallback((product: Product, qty = 1, option = 0) => {
    const key = keyOf(product.id, option);
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, product, option, qty }];
    });
    setToast(product.title);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty } : l)).filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * priceOf(l.product, l.option).price, 0),
      hydrated,
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, hydrated, add, setQty, remove, clear],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div
          role="status"
          className="animate-toast fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[420px] items-center gap-3 rounded-[20px] bg-ink py-3 pr-3 pl-4 text-white shadow-soft"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent">
            <Check className="size-4" strokeWidth={2.6} />
          </span>
          <span className="min-w-0 flex-1 text-[14px] leading-tight">
            <span className="block truncate font-medium">{toast}</span>
            <span className="text-white/60">добавлен в корзину</span>
          </span>
          <Link
            href="/cart"
            onClick={() => setToast(null)}
            className="shrink-0 rounded-full bg-white px-4 py-2 text-[13px] text-ink transition-colors hover:bg-accent hover:text-white"
          >
            В корзину
          </Link>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
