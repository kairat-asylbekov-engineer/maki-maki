"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/data/site";
import { useCart } from "./CartProvider";

const DELIVERY_FREE_FROM = 1500;

export function CartDrawer() {
  const cart = useCart();
  const [ordered, setOrdered] = useState(false);
  const { isOpen, close } = cart;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const left = Math.max(0, DELIVERY_FREE_FROM - cart.total);

  const checkout = () => {
    setOrdered(true);
    cart.clear();
  };

  return (
    <>
      {/* Плавающая кнопка корзины */}
      <button
        type="button"
        onClick={() => {
          setOrdered(false);
          cart.open();
        }}
        aria-label={`Корзина, товаров: ${cart.count}`}
        className={`fixed right-4 bottom-4 z-40 flex h-14 items-center gap-2.5 rounded-full bg-accent pr-5 pl-4 text-white shadow-accent transition-all duration-300 hover:bg-accent-hover md:right-8 md:bottom-8 ${
          cart.count > 0 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="relative">
          <ShoppingBag className="size-6" strokeWidth={1.8} />
          <span className="absolute -top-1.5 -right-2 grid size-[18px] place-items-center rounded-full bg-white font-display text-[10px] text-accent">
            {cart.count}
          </span>
        </span>
        <span className="text-[15px] font-medium">{formatPrice(cart.total)}</span>
      </button>

      {/* Тост */}
      {cart.toast && (
        <div
          role="status"
          className="animate-toast fixed bottom-24 left-1/2 z-50 rounded-full bg-ink px-5 py-3 text-[14px] text-white shadow-soft md:bottom-28"
        >
          {cart.toast}
        </div>
      )}

      {/* Оверлей + панель */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Корзина"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-page shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="font-display text-[22px]">Корзина</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть корзину"
            className="grid size-10 place-items-center rounded-full bg-white transition hover:bg-cream"
          >
            <X className="size-5" />
          </button>
        </div>

        {ordered ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 grid size-20 place-items-center rounded-full bg-cream text-4xl">🍣</div>
            <p className="font-display text-[20px]">Заказ принят!</p>
            <p className="mt-3 text-[14px] text-muted">
              Это демо-версия сайта — в рабочей версии здесь будет оформление и оплата заказа.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-7 h-[43px] rounded-full bg-accent px-6 text-[14px] text-white shadow-accent transition hover:bg-accent-hover"
            >
              Вернуться к меню
            </button>
          </div>
        ) : cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="mb-4 size-12 text-accent" strokeWidth={1.4} />
            <p className="font-display text-[18px]">В корзине пока пусто</p>
            <p className="mt-2 text-[14px] text-muted">Добавьте роллы из «Популярного сегодня»</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-6">
              {cart.lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 rounded-[18px] bg-white p-3">
                  <Image
                    src={product.image}
                    alt=""
                    width={76}
                    height={76}
                    className="size-[76px] shrink-0 rounded-[12px] object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[15px] leading-tight font-medium">{product.title}</p>
                      <button
                        type="button"
                        onClick={() => cart.remove(product.id)}
                        aria-label="Удалить"
                        className="text-muted transition hover:text-accent"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-[12px] text-muted">{product.portion}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full bg-cream p-1">
                        <button
                          type="button"
                          onClick={() => cart.decrement(product.id)}
                          aria-label="Меньше"
                          className="grid size-7 place-items-center rounded-full bg-white"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-[14px] font-medium">{qty}</span>
                        <button
                          type="button"
                          onClick={() => cart.add(product)}
                          aria-label="Больше"
                          className="grid size-7 place-items-center rounded-full bg-white"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-[15px] font-medium">{formatPrice(product.price * qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 bg-white px-6 pt-5 pb-6">
              <p className="text-[13px] text-muted">
                {left > 0
                  ? `До бесплатной доставки: ${formatPrice(left)}`
                  : "Бесплатная доставка 🎉"}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[15px]">Итого</span>
                <span className="font-display text-[22px]">{formatPrice(cart.total)}</span>
              </div>
              <button
                type="button"
                onClick={checkout}
                className="mt-4 h-[50px] w-full rounded-full bg-accent text-[15px] text-white shadow-accent transition hover:bg-accent-hover"
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
