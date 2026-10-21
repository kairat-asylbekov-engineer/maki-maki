"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { formatPrice, popularProducts, type Product } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";

// Имитация загрузки с API: сначала показываем скелетоны, как в макете
const MOCK_DELAY = 900;

export function Popular() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setProducts(popularProducts), MOCK_DELAY);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="popular" className="container-main pt-14 lg:pt-[87px]">
      <h2 className="heading-section">Популярное сегодня</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-4 lg:mt-[26px] lg:gap-6">
        {products
          ? products.map((p) => <ProductCard key={p.id} product={p} />)
          : Array.from({ length: 4 }, (_, i) => <ProductSkeleton key={i} />)}
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-skeleton flex flex-col rounded-[22px] bg-white p-[21px]" aria-hidden>
      <div className="h-[187px] rounded-[16px] bg-skeleton" />
      <div className="mt-[24px] h-[23px] rounded-[4px] bg-skeleton" />
      <div className="mt-[10px] h-[26px] w-[75px] rounded-[4px] bg-skeleton" />
      <div className="mt-[27px] h-[15px] rounded-[4px] bg-skeleton" />
      <div className="mt-[7px] h-[15px] rounded-[4px] bg-skeleton" />
      <div className="mt-[23px] h-[37px] rounded-[4px] bg-skeleton" />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const qty = cart.qtyOf(product.id);

  return (
    <article className="group flex flex-col rounded-[22px] bg-white p-[21px] transition-shadow duration-300 hover:shadow-soft">
      <div className="relative h-[187px] overflow-hidden rounded-[16px] bg-skeleton">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 220px, (min-width: 480px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-accent px-2.5 py-1 text-[11px] leading-none text-white">
            {product.badge}
          </span>
        )}
      </div>
      <h3 className="mt-[22px] line-clamp-1 text-[17px] leading-[27px] font-medium">{product.title}</h3>
      <span className="mt-[8px] inline-flex h-[26px] w-fit items-center rounded-full bg-cream px-3 text-[12px] text-ink/80">
        {product.portion}
      </span>
      <p className="mt-[20px] line-clamp-2 min-h-[44px] text-[12.5px] leading-[22px] text-muted">
        {product.description}
      </p>
      <div className="mt-auto pt-[23px]">
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => cart.add(product)}
            className="flex h-[37px] w-full items-center justify-between rounded-full bg-cream pr-1 pl-4 text-[14px] transition-colors hover:bg-accent hover:text-white"
          >
            <span className="font-medium">{formatPrice(product.price)}</span>
            <span className="flex h-[29px] items-center gap-1 rounded-full bg-accent px-3 text-[13px] text-white">
              <Plus className="size-3.5" strokeWidth={2.4} />В корзину
            </span>
          </button>
        ) : (
          <div className="flex h-[37px] items-center justify-between rounded-full bg-accent p-1 text-white">
            <button
              type="button"
              onClick={() => cart.decrement(product.id)}
              aria-label="Убрать одну порцию"
              className="grid size-[29px] place-items-center rounded-full bg-white/20 transition hover:bg-white/30"
            >
              <Minus className="size-4" />
            </button>
            <span className="text-[14px] font-medium">
              {qty} × {formatPrice(product.price)}
            </span>
            <button
              type="button"
              onClick={() => cart.add(product)}
              aria-label="Добавить ещё порцию"
              className="grid size-[29px] place-items-center rounded-full bg-white/20 transition hover:bg-white/30"
            >
              <Plus className="size-4" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
