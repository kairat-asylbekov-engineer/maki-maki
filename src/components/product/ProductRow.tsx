"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/menu";
import { ProductCard } from "@/components/catalog/ProductCard";

/** Горизонтальная лента товаров со стрелками («Похожие», «Рекомендуемые») */
export function ProductRow({ title, products }: { title: string; products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  if (!products.length) return null;
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="mt-12 lg:mt-[70px]">
      <div className="flex items-end justify-between gap-4">
        <h2 className="heading-section">{title}</h2>
        {products.length > 4 && (
          <div className="flex gap-2">
            <ArrowButton onClick={() => scroll(-1)} label="Назад">
              <ChevronLeft className="size-5" />
            </ArrowButton>
            <ArrowButton onClick={() => scroll(1)} label="Вперёд">
              <ChevronRight className="size-5" />
            </ArrowButton>
          </div>
        )}
      </div>
      <div
        ref={ref}
        className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 lg:mx-0 lg:mt-[26px] lg:scroll-px-0 lg:gap-6 lg:px-0"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[72%] shrink-0 snap-start min-[480px]:w-[45%] md:w-[31%] lg:w-[calc((100%-72px)/4)]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ArrowButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full bg-accent text-white shadow-accent transition-colors hover:bg-accent-hover"
    >
      {children}
    </button>
  );
}
