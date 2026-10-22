"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/data/site";
import { discountOf, priceOf, tagColors, tagLabels, type Product } from "@/data/menu";
import { useCart } from "@/components/cart/CartProvider";
import { QtyStepper } from "@/components/ui/QtyStepper";

export function ProductLabels({ product, option = 0, className = "" }: { product: Product; option?: number; className?: string }) {
  const discount = discountOf(priceOf(product, option));
  const tags = product.tags ?? [];
  if (!tags.length && !discount) return null;
  return (
    <div className={`flex flex-wrap gap-[3px] ${className}`}>
      {tags.map((t) => (
        <span
          key={t}
          className={`rounded-full px-[7px] py-[3px] font-display text-[8.5px] leading-none text-white uppercase lg:text-[9px] ${tagColors[t]}`}
        >
          {tagLabels[t]}
        </span>
      ))}
      {discount > 0 && (
        <span className={`rounded-full px-[7px] py-[3px] font-display text-[8.5px] leading-none text-white lg:text-[9px] ${tagColors.discount}`}>
          −{discount}%
        </span>
      )}
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="animate-skeleton flex flex-col rounded-[22px] bg-white p-[21px]" aria-hidden>
      <div className="aspect-square rounded-[16px] bg-skeleton" />
      <div className="mt-[18px] h-[20px] rounded-[4px] bg-skeleton" />
      <div className="mt-[10px] h-[30px] w-[110px] rounded-[4px] bg-skeleton" />
      <div className="mt-[16px] h-[30px] w-[96px] rounded-full bg-skeleton" />
      <div className="mt-[16px] h-[37px] rounded-full bg-skeleton" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const { price, oldPrice } = priceOf(product);
  const href = `/product/${product.id}`;

  return (
    <article className="group flex h-full flex-col rounded-[22px] bg-white p-[21px] transition-shadow duration-300 hover:shadow-soft">
      <Link href={href} className="relative block aspect-square overflow-hidden rounded-[16px] bg-[#f5f5f5]" tabIndex={-1}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 480px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <ProductLabels product={product} className="absolute bottom-[11px] left-[12px] right-3" />
      </Link>
      <h3 className="mt-[14px] min-h-[2.6em] font-display text-[16px] leading-[1.3] lg:text-[15.5px]">
        <Link href={href} className="line-clamp-2 transition-colors hover:text-accent">
          {product.title}
        </Link>
      </h3>
      <p className="mt-[2px] text-[12px] text-muted">{product.options[0].label}</p>
      <div className="mt-auto pt-[6px]">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[24px] leading-[1.3] lg:text-[25px]">{formatPrice(price)}</span>
          {oldPrice && <s className="text-[13px] text-muted">{formatPrice(oldPrice)}</s>}
        </div>
        <QtyStepper value={qty} onChange={setQty} className="mt-[10px]" />
        <button
          type="button"
          onClick={() => {
            cart.add(product, qty);
            setQty(1);
          }}
          className="mt-[14px] h-[37px] w-full rounded-full bg-accent text-[14px] text-white shadow-accent transition-colors hover:bg-accent-hover active:scale-[0.99]"
        >
          В корзину
        </button>
      </div>
    </article>
  );
}
