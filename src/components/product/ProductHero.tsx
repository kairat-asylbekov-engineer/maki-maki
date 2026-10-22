"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatPrice, site } from "@/data/site";
import { priceOf, type Product } from "@/data/menu";
import { useCart } from "@/components/cart/CartProvider";
import { ProductLabels } from "@/components/catalog/ProductCard";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { OkIcon, TelegramIcon, VkIcon } from "@/components/ui/icons";

/** Верх карточки товара: галерея, состав, выбор порции и блок цены справа (как в шаблоне) */
export function ProductHero({ product }: { product: Product }) {
  const cart = useCart();
  const gallery = product.gallery ?? [product.image];
  const [active, setActive] = useState(0);
  const [option, setOption] = useState(0);
  const [qty, setQty] = useState(1);
  const { price, oldPrice } = priceOf(product, option);

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-[22px]">
      <section className="grid gap-5 rounded-[22px] bg-white p-4 sm:p-[21px] md:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-[22px]">
        {/* Галерея */}
        <div className="flex gap-3">
          {gallery.length > 1 && (
            <div className="flex w-[52px] shrink-0 flex-col gap-2">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Фото ${i + 1}`}
                  aria-pressed={active === i}
                  className={`relative size-[52px] overflow-hidden rounded-[10px] ring-2 transition ${
                    active === i ? "ring-accent" : "ring-transparent hover:ring-[#fdd5cf]"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="52px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="relative aspect-square flex-1 overflow-hidden rounded-[16px] bg-[#f5f5f5]">
            <Image
              src={gallery[active]}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <ProductLabels product={product} option={option} className="absolute top-3 left-3" />
          </div>
        </div>

        {/* Описание и параметры */}
        <div className="text-[13px] leading-[1.5]">
          <p>{product.description}</p>
          <p className="mt-4 text-[14px] font-medium">Состав</p>
          <p className="mt-0.5 text-ink/80">{product.composition}</p>

          <label className="mt-4 block">
            <span className="text-[14px] font-medium">Порция</span>
            <span className="relative mt-1.5 block">
              <select
                value={option}
                onChange={(e) => setOption(Number(e.target.value))}
                disabled={product.options.length < 2}
                className="h-[42px] w-full cursor-pointer appearance-none rounded-full border border-[#ecdfd9] bg-white pr-10 pl-4 text-[14px] outline-none focus:border-accent disabled:cursor-default"
              >
                {product.options.map((o, i) => (
                  <option key={o.label} value={i}>
                    {o.label}
                  </option>
                ))}
              </select>
              {product.options.length > 1 && (
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2" />
              )}
            </span>
          </label>

          <p className="mt-4 text-[14px] font-medium">Калорийность</p>
          <p className="mt-0.5 text-ink/80">{product.kcal} ккал на 100 г</p>
        </div>
      </section>

      {/* Цена и покупка */}
      <aside className="rounded-[22px] bg-white p-[21px] lg:sticky lg:top-[100px] xl:top-[110px]">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-[26px] leading-[1.2]">{formatPrice(price)}</span>
          {oldPrice && <s className="text-[15px] text-muted">{formatPrice(oldPrice)}</s>}
        </div>
        <QtyStepper value={qty} onChange={setQty} className="mt-3" />
        <button
          type="button"
          onClick={() => {
            cart.add(product, qty, option);
            setQty(1);
          }}
          className="mt-4 h-[44px] w-full rounded-full bg-accent text-[15px] text-white shadow-accent transition-colors hover:bg-accent-hover"
        >
          В корзину
        </button>
        <p className="mt-4 text-[12px] text-muted">Поделиться</p>
        <div className="mt-1.5 flex gap-1.5">
          <a href={site.vkHref} target="_blank" rel="noreferrer" aria-label="ВКонтакте" className="grid size-8 place-items-center rounded-[8px] bg-vk text-white">
            <VkIcon className="size-5" />
          </a>
          <a href={site.okHref} target="_blank" rel="noreferrer" aria-label="Одноклассники" className="grid size-8 place-items-center rounded-[8px] bg-ok text-white">
            <OkIcon className="size-[18px]" />
          </a>
          <a href={site.telegramHref} target="_blank" rel="noreferrer" aria-label="Telegram" className="grid size-8 place-items-center rounded-[8px] bg-[#229ed9] text-white">
            <TelegramIcon className="size-[18px]" />
          </a>
        </div>
      </aside>
    </div>
  );
}
