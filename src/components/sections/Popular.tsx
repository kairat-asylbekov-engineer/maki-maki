"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { popularProducts, type Product } from "@/data/site";
import { ProductCard, ProductSkeleton } from "@/components/catalog/ProductCard";

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
      <div className="flex items-end justify-between gap-4">
        <h2 className="heading-section">Популярное сегодня</h2>
        <Link
          href="/catalog"
          className="group mb-1 hidden items-center gap-1.5 text-[14px] text-ink/70 transition-colors hover:text-accent sm:inline-flex"
        >
          Весь каталог
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-4 lg:mt-[26px] lg:gap-6">
        {products
          ? products.map((p) => <ProductCard key={p.id} product={p} />)
          : Array.from({ length: 4 }, (_, i) => <ProductSkeleton key={i} />)}
      </div>
    </section>
  );
}
