"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { Product, ProductTag } from "@/data/menu";
import { site } from "@/data/site";
import { ProductCard } from "./ProductCard";

export type Chip = { href: string; label: string; active?: boolean };

type Filters = {
  priceFrom: string;
  priceTo: string;
  kcalFrom: string;
  kcalTo: string;
  toggles: string[];
};

const emptyFilters: Filters = { priceFrom: "", priceTo: "", kcalFrom: "", kcalTo: "", toggles: [] };

// Переключатели как в шаблоне
const toggles: { key: string; label: string; test: (p: Product) => boolean }[] = [
  { key: "baked", label: "Запечённое", test: (p) => has(p, "baked") },
  { key: "spicy", label: "Острое", test: (p) => has(p, "spicy") },
  { key: "veg", label: "Веган", test: (p) => has(p, "veg") },
  { key: "new", label: "Новинка", test: (p) => has(p, "new") },
  {
    key: "special",
    label: "Спецпредложение",
    test: (p) => has(p, "promo") || p.options.some((o) => o.oldPrice),
  },
];
const has = (p: Product, t: ProductTag) => p.tags?.includes(t) ?? false;

export function CatalogView({
  products,
  chips,
  chipStyle = "solid",
}: {
  products: Product[];
  chips?: Chip[];
  /** solid — красные чипы разделов (как на странице «Каталог»), soft — розовые чипы подразделов */
  chipStyle?: "solid" | "soft";
}) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [open, setOpen] = useState(false);

  const activeCount =
    [filters.priceFrom || filters.priceTo, filters.kcalFrom || filters.kcalTo].filter(Boolean).length +
    filters.toggles.length;

  const filtered = useMemo(() => {
    const n = (v: string, d: number) => (v ? Number(v) : d);
    return products.filter((p) => {
      const price = p.options[0].price;
      if (price < n(filters.priceFrom, 0) || price > n(filters.priceTo, Infinity)) return false;
      if (p.kcal < n(filters.kcalFrom, 0) || p.kcal > n(filters.kcalTo, Infinity)) return false;
      return filters.toggles.every((k) => toggles.find((t) => t.key === k)!.test(p));
    });
  }, [products, filters]);

  return (
    <>
      {chips && chips.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {chips.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              aria-current={c.active ? "page" : undefined}
              className={
                chipStyle === "solid"
                  ? `flex h-[38px] items-center rounded-full px-4 text-[15px] transition-colors lg:h-[38px] ${
                      c.active
                        ? "bg-ink text-white"
                        : "bg-accent text-white shadow-accent hover:bg-accent-hover"
                    }`
                  : `flex h-[38px] items-center rounded-full px-5 text-[15px] transition-colors ${
                      c.active ? "bg-accent text-white" : "bg-[#fdd5cf] hover:bg-[#fcc3ba]"
                    }`
              }
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 flex h-[38px] w-full items-center justify-center gap-2 rounded-full bg-accent text-[15px] text-white shadow-accent transition-colors hover:bg-accent-hover sm:w-[231px] lg:mt-[30px]"
      >
        Фильтр
        {activeCount > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-white font-display text-[10px] text-accent">
            {activeCount}
          </span>
        )}
      </button>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:mt-[24px] lg:grid-cols-4 lg:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-[22px] bg-white px-6 py-16 text-center">
          <span className="text-5xl">🍣</span>
          <p className="mt-4 font-display text-[20px]">Ничего не нашлось</p>
          <p className="mt-2 text-[14px] text-muted">Попробуйте изменить условия фильтра</p>
          <button
            type="button"
            onClick={() => setFilters(emptyFilters)}
            className="mt-6 h-[43px] rounded-full bg-accent px-6 text-[14px] text-white shadow-accent transition hover:bg-accent-hover"
          >
            Сбросить фильтр
          </button>
        </div>
      )}

      <FilterDialog open={open} onClose={() => setOpen(false)} filters={filters} setFilters={setFilters} found={filtered.length} />
    </>
  );
}

function FilterDialog({
  open,
  onClose,
  filters,
  setFilters,
  found,
}: {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
  found: number;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const set = (patch: Partial<Filters>) => setFilters({ ...filters, ...patch });
  const num = (v: string) => v.replace(/\D/g, "").slice(0, 6);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/35 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Фильтр"
        inert={!open}
        className={`fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[400px] -translate-x-1/2 overflow-y-auto rounded-[30px] bg-page px-[30px] pt-[30px] pb-[34px] shadow-2xl transition-all duration-300 ${
          open ? "-translate-y-1/2 opacity-100" : "pointer-events-none -translate-y-[46%] opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[20px]">Фильтр</h2>
          <button type="button" onClick={onClose} aria-label="Закрыть фильтр" className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-white">
            <X className="size-6" />
          </button>
        </div>

        <fieldset className="mt-4 border-b border-[#ecdfd9] pb-5">
          <legend className="mb-3 text-[15px]">Цена, {site.currency}</legend>
          <div className="grid grid-cols-2 gap-2.5">
            <RangeInput placeholder="От" value={filters.priceFrom} onChange={(v) => set({ priceFrom: num(v) })} />
            <RangeInput placeholder="До" value={filters.priceTo} onChange={(v) => set({ priceTo: num(v) })} />
          </div>
        </fieldset>

        <fieldset className="mt-5 border-b border-[#ecdfd9] pb-5">
          <legend className="mb-3 text-[15px]">Калорийность, ккал на 100 г</legend>
          <div className="grid grid-cols-2 gap-2.5">
            <RangeInput placeholder="От" value={filters.kcalFrom} onChange={(v) => set({ kcalFrom: num(v) })} />
            <RangeInput placeholder="До" value={filters.kcalTo} onChange={(v) => set({ kcalTo: num(v) })} />
          </div>
        </fieldset>

        <div className="mt-1">
          {toggles.map((t) => {
            const on = filters.toggles.includes(t.key);
            return (
              <label key={t.key} className="flex cursor-pointer items-center gap-3 border-b border-[#ecdfd9] py-[14px] text-[15px]">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={on}
                  onChange={() =>
                    set({ toggles: on ? filters.toggles.filter((k) => k !== t.key) : [...filters.toggles, t.key] })
                  }
                />
                <span
                  aria-hidden
                  className={`relative h-[22px] w-[40px] shrink-0 rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50 ${
                    on ? "border-accent bg-accent" : "border-[#f3d6d1] bg-white"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 size-[16px] -translate-y-1/2 rounded-full transition-all ${
                      on ? "left-[20px] bg-white" : "left-[3px] bg-[#fbcfc9]"
                    }`}
                  />
                </span>
                {t.label}
              </label>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-[46px] w-full rounded-full bg-accent text-[15px] text-white shadow-accent transition-colors hover:bg-accent-hover"
        >
          Показать {found}
        </button>
        <button
          type="button"
          onClick={() => setFilters(emptyFilters)}
          className="mt-2.5 h-[46px] w-full rounded-full bg-[#fdd5cf] text-[15px] transition-colors hover:bg-[#fcc3ba]"
        >
          Сбросить фильтр
        </button>
      </div>
    </>
  );
}

function RangeInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="h-[46px] w-full rounded-full border border-[#f3d6d1] bg-white px-4 text-[15px] outline-none placeholder:text-ink focus:border-accent"
    />
  );
}
