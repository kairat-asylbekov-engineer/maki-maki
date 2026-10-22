"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Check, ChevronRight, ShoppingBag, X } from "lucide-react";
import { formatPrice, site } from "@/data/site";
import { priceOf } from "@/data/menu";
import { delivery, promoCodes } from "@/data/pages";
import { useCart } from "./CartProvider";
import { QtyStepper } from "@/components/ui/QtyStepper";

const FREE_DELIVERY_FROM = 1500;
const COURIER_PRICE = 199;
const PICKUP_DISCOUNT = 10;

export function CartPage() {
  const cart = useCart();
  const [method, setMethod] = useState<"courier" | "pickup">("courier");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; percent: number } | null>(null);
  const [codeError, setCodeError] = useState(false);
  const [order, setOrder] = useState<number | null>(null);

  if (order) {
    return (
      <div className="flex flex-col items-center rounded-[26px] bg-white px-6 py-14 text-center lg:py-20">
        <span className="grid size-16 place-items-center rounded-full bg-accent text-white">
          <Check className="size-8" strokeWidth={2.4} />
        </span>
        <p className="mt-5 font-display text-[24px] lg:text-[28px]">Заказ №{order} принят!</p>
        <p className="mt-3 max-w-[420px] text-[14px] leading-[1.6] text-muted">
          Оператор перезвонит в течение 5 минут, чтобы подтвердить заказ. Это демо-версия сайта — заказ никуда не
          отправлен.
        </p>
        <Link
          href="/catalog"
          className="mt-7 grid h-[43px] place-items-center rounded-full bg-accent px-7 text-[14px] text-white shadow-accent transition-colors hover:bg-accent-hover"
        >
          Вернуться в меню
        </Link>
      </div>
    );
  }

  if (!cart.hydrated) {
    return <div className="h-[260px] animate-skeleton rounded-[22px] bg-white" aria-hidden />;
  }

  if (cart.lines.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-[26px] bg-white px-6 py-14 text-center lg:py-20">
        <ShoppingBag className="size-14 text-accent" strokeWidth={1.3} />
        <p className="mt-5 font-display text-[22px]">В корзине пока пусто</p>
        <p className="mt-2 text-[14px] text-muted">Загляните в меню — там много вкусного</p>
        <Link
          href="/catalog"
          className="mt-7 grid h-[43px] place-items-center rounded-full bg-accent px-7 text-[14px] text-white shadow-accent transition-colors hover:bg-accent-hover"
        >
          Перейти в меню
        </Link>
      </div>
    );
  }

  const subtotal = cart.total;
  const discount = Math.round(
    (subtotal * ((applied?.percent ?? 0) + (method === "pickup" ? PICKUP_DISCOUNT : 0))) / 100,
  );
  const deliveryPrice = method === "courier" && subtotal < FREE_DELIVERY_FROM ? COURIER_PRICE : 0;
  const total = subtotal - discount + deliveryPrice;

  const applyCode = () => {
    const c = code.trim().toUpperCase();
    if (promoCodes[c]) {
      setApplied({ code: c, percent: promoCodes[c] });
      setCodeError(false);
    } else {
      setApplied(null);
      setCodeError(true);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOrder(Math.floor(1000 + Math.random() * 9000));
    cart.clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-[22px]">
      <div className="space-y-4 lg:space-y-[22px]">
        {/* Позиции */}
        <section aria-label="Товары в корзине">
          <ul className="space-y-3">
            {cart.lines.map((l) => {
              const opt = priceOf(l.product, l.option);
              return (
                <li key={l.key} className="relative flex gap-4 rounded-[22px] bg-white p-4 pr-10 lg:items-center lg:p-[18px] lg:pr-12">
                  <Link href={`/product/${l.product.id === "roll-of-day" ? "dragon" : l.product.id}`} className="relative size-[76px] shrink-0 overflow-hidden rounded-[14px] bg-[#f5f5f5] lg:size-[88px]">
                    <Image src={l.product.image} alt="" fill sizes="88px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[15px] leading-[1.25]">{l.product.title}</p>
                      <p className="mt-1 text-[12px] text-muted">{opt.label}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <QtyStepper value={l.qty} min={0} onChange={(v) => cart.setQty(l.key, v)} />
                      <span className="w-[86px] text-right font-display text-[17px]">{formatPrice(opt.price * l.qty)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.remove(l.key)}
                    aria-label={`Удалить ${l.product.title}`}
                    className="absolute top-3 right-3 grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-cream hover:text-accent"
                  >
                    <X className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-2 text-right">
            <button type="button" onClick={cart.clear} className="text-[13px] text-muted underline-offset-2 hover:text-accent hover:underline">
              Очистить корзину
            </button>
          </div>
        </section>

        {/* Доставка */}
        <section className="rounded-[22px] bg-white p-5 lg:p-[26px]">
          <h2 className="font-display text-[19px]">Доставка</h2>
          <div className="mt-4 space-y-3">
            <Radio checked={method === "courier"} onChange={() => setMethod("courier")}>
              Курьер — {subtotal >= FREE_DELIVERY_FROM ? "бесплатно" : `${formatPrice(COURIER_PRICE)}, бесплатно от ${formatPrice(FREE_DELIVERY_FROM)}`}
            </Radio>
            <Radio checked={method === "pickup"} onChange={() => setMethod("pickup")}>
              Самовывоз — скидка {PICKUP_DISCOUNT}% · {site.address}
            </Radio>
          </div>
          <Link href="/delivery" className="mt-3 inline-flex items-center gap-1 text-[13px] text-accent hover:underline">
            Зоны и условия доставки <ChevronRight className="size-3.5" />
          </Link>
          <span className="sr-only">{delivery.zonesIntro}</span>
        </section>

        {/* Форма заказа */}
        <form id="order-form" onSubmit={submit} className="rounded-[22px] bg-white p-5 lg:p-[26px]">
          <h2 className="font-display text-[19px]">Форма заказа</h2>
          <div className="mt-4 grid gap-4 text-[14px] md:grid-cols-2">
            <Input label="Имя" name="name" required autoComplete="name" />
            <Input label="Телефон" name="phone" type="tel" required autoComplete="tel" placeholder="+7 (___) ___-__-__" />
            {method === "courier" && (
              <Input label="Адрес доставки" name="address" required autoComplete="street-address" className="md:col-span-2" placeholder="Улица, дом, квартира, подъезд, этаж" />
            )}
            <Input label="E-mail" name="email" type="email" autoComplete="email" />
            <label className="block">
              <span>Оплата</span>
              <select name="pay" className="mt-1.5 block h-[46px] w-full rounded-full border border-[#ecdfd9] bg-white px-4 outline-none focus:border-accent">
                <option>Картой курьеру</option>
                <option>Наличными</option>
                <option>Онлайн на сайте</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span>Комментарий к заказу</span>
              <textarea
                name="comment"
                rows={3}
                className="mt-1.5 block w-full resize-y rounded-[16px] border border-[#ecdfd9] bg-white px-4 py-3 outline-none focus:border-accent"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-5 h-[46px] w-full rounded-full bg-accent text-[15px] text-white shadow-accent transition-colors hover:bg-accent-hover md:w-[280px] lg:hidden"
          >
            Оформить заказ · {formatPrice(total)}
          </button>
        </form>
      </div>

      {/* Итог */}
      <aside className="rounded-[22px] bg-white p-5 lg:sticky lg:top-[100px] lg:p-[22px] xl:top-[110px]">
        <dl className="space-y-2.5 text-[14px]">
          <Row label="Сумма" value={formatPrice(subtotal)} />
          {discount > 0 && <Row label="Скидка" value={`−${formatPrice(discount)}`} accent />}
          <Row label="Доставка" value={deliveryPrice ? formatPrice(deliveryPrice) : "бесплатно"} />
          <div className="flex items-baseline justify-between border-t border-[#f1e8e3] pt-3">
            <dt>Итого</dt>
            <dd className="font-display text-[24px]">{formatPrice(total)}</dd>
          </div>
        </dl>

        <div className="mt-4">
          <div className="flex h-[46px] items-center rounded-full border border-[#ecdfd9] pl-4 focus-within:border-accent">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && applyCode()}
              placeholder="Промокод"
              aria-label="Промокод"
              className="min-w-0 flex-1 bg-transparent text-[14px] uppercase outline-none placeholder:normal-case"
            />
            <button type="button" onClick={applyCode} aria-label="Применить промокод" className="grid size-[46px] place-items-center text-ink hover:text-accent">
              <ChevronRight className="size-5" />
            </button>
          </div>
          {applied && <p className="mt-1.5 pl-4 text-[12px] text-[#2a9c3c]">Промокод {applied.code}: −{applied.percent}%</p>}
          {codeError && <p className="mt-1.5 pl-4 text-[12px] text-accent">Такого промокода нет</p>}
        </div>

        <button
          type="submit"
          form="order-form"
          className="mt-4 hidden h-[46px] w-full rounded-full bg-accent text-[15px] text-white shadow-accent transition-colors hover:bg-accent-hover lg:block"
        >
          Оформить заказ
        </button>
        <p className="mt-3 text-[11.5px] leading-[1.45] text-muted">
          Нажимая «Оформить заказ», вы соглашаетесь с условиями обработки персональных данных.
        </p>
      </aside>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-ink/75">{label}</dt>
      <dd className={`font-display text-[16px] ${accent ? "text-accent" : ""}`}>{value}</dd>
    </div>
  );
}

function Radio({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px]">
      <input type="radio" name="method" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={`grid size-[20px] shrink-0 place-items-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 ${
          checked ? "border-accent" : "border-[#e7d9d3]"
        }`}
      >
        {checked && <span className="size-2.5 rounded-full bg-accent" />}
      </span>
      <span className="font-medium">{children}</span>
    </label>
  );
}

function Input({
  label,
  className = "",
  ...rest
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span>
        {label}
        {rest.required && <span className="text-accent"> *</span>}
      </span>
      <input
        {...rest}
        className="mt-1.5 block h-[46px] w-full rounded-full border border-[#ecdfd9] bg-white px-4 outline-none focus:border-accent"
      />
    </label>
  );
}
