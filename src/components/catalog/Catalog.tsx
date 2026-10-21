"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, Flame, Search, SlidersHorizontal, X } from "lucide-react";
import {
  categories,
  menu,
  tagLabels,
  type CategorySlug,
  type Product,
  type ProductTag,
} from "@/data/menu";
import { ProductCard, ProductSkeleton } from "./ProductCard";

const categoryImages: Record<CategorySlug, string> = {
  rolls: "/images/tile-rolls.webp",
  baked: "/images/menu/baked-salmon.webp",
  sets: "/images/tile-sets.webp",
  sushi: "/images/tile-sushi.webp",
  sashimi: "/images/tile-sashimi.webp",
  drinks: "/images/menu/green-tea.webp",
};

const sorts = {
  popular: { label: "Популярные", fn: (a: Product, b: Product) => (b.popularity ?? 0) - (a.popularity ?? 0) },
  cheap: { label: "Сначала дешевле", fn: (a: Product, b: Product) => a.price - b.price },
  expensive: { label: "Сначала дороже", fn: (a: Product, b: Product) => b.price - a.price },
  name: { label: "По названию", fn: (a: Product, b: Product) => a.title.localeCompare(b.title, "ru") },
} as const;
type SortKey = keyof typeof sorts;

const allTags = Object.keys(tagLabels) as ProductTag[];

const plural = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "товар";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "товара";
  return "товаров";
};

export function Catalog() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const categoryParam = params.get("category");
  const category = categories.some((c) => c.slug === categoryParam) ? (categoryParam as CategorySlug) : null;
  const sortParam = params.get("sort");
  const sort: SortKey = sortParam && sortParam in sorts ? (sortParam as SortKey) : "popular";

  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<ProductTag[]>([]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const counts = useMemo(() => {
    const map = new Map<CategorySlug, number>();
    menu.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = Number(priceFrom) || 0;
    const max = Number(priceTo) || Infinity;
    return menu
      .filter((p) => !category || p.category === category)
      .filter((p) => !q || `${p.title} ${p.description}`.toLowerCase().includes(q))
      .filter((p) => tags.every((t) => p.tags?.includes(t)))
      .filter((p) => p.price >= min && p.price <= max)
      .sort(sorts[sort].fn);
  }, [category, query, tags, priceFrom, priceTo, sort]);

  // Без выбранной категории — показываем меню, сгруппированное по разделам
  const groups = useMemo(() => {
    if (category) return [{ slug: category, title: "", items: filtered }];
    return categories
      .map((c) => ({ ...c, items: filtered.filter((p) => p.category === c.slug) }))
      .filter((g) => g.items.length > 0);
  }, [category, filtered]);

  const hasFilters = Boolean(query || tags.length || priceFrom || priceTo);
  const resetFilters = () => {
    setQuery("");
    setTags([]);
    setPriceFrom("");
    setPriceTo("");
  };
  const toggleTag = (t: ProductTag) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const activeTitle = category ? categories.find((c) => c.slug === category)!.title : "Каталог";

  return (
    <>
      <h1 className="mt-3 font-display text-[28px] leading-[1.15] md:text-[38px]">{activeTitle}</h1>

      {/* Категории */}
      <div className="sticky top-0 z-30 -mx-4 mt-6 bg-page/90 px-4 py-3 backdrop-blur-md lg:mx-0 lg:px-0">
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto">
          <CategoryChip active={!category} onClick={() => setParam("category", null)} count={menu.length}>
            Все
          </CategoryChip>
          {categories.map((c) => (
            <CategoryChip
              key={c.slug}
              active={category === c.slug}
              onClick={() => setParam("category", c.slug)}
              image={categoryImages[c.slug]}
              count={counts.get(c.slug) ?? 0}
            >
              {c.title}
            </CategoryChip>
          ))}
        </div>
      </div>

      {/* Панель фильтров */}
      <div className="mt-3 rounded-[22px] bg-white p-3 lg:p-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-[220px] flex-1">
            <span className="sr-only">Поиск по меню</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти ролл, сет или соус"
              className="h-[46px] w-full rounded-full bg-cream pr-4 pl-11 text-[14px] outline-none placeholder:text-muted focus:ring-2 focus:ring-accent/40"
            />
          </label>

          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="flex h-[46px] items-center gap-2 rounded-full bg-cream px-4 text-[14px] md:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Фильтры
            {hasFilters && <span className="size-2 rounded-full bg-accent" />}
          </button>

          <div className={`w-full flex-wrap items-center gap-3 md:flex md:w-auto ${filtersOpen ? "flex" : "hidden"}`}>
            <div className="flex items-center gap-2 text-[14px]">
              <span className="text-muted">Цена</span>
              <PriceInput value={priceFrom} onChange={setPriceFrom} placeholder="от" />
              <span className="text-muted">—</span>
              <PriceInput value={priceTo} onChange={setPriceTo} placeholder="до" />
            </div>

            <label className="relative">
              <span className="sr-only">Сортировка</span>
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value === "popular" ? null : e.target.value)}
                className="h-[46px] cursor-pointer appearance-none rounded-full bg-cream pr-10 pl-4 text-[14px] outline-none focus:ring-2 focus:ring-accent/40"
              >
                {Object.entries(sorts).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2" />
            </label>
          </div>
        </div>

        <div
          className={`mt-3 flex-wrap items-center gap-2 border-t border-cream pt-3 md:flex ${filtersOpen ? "flex" : "hidden"}`}
        >
          {allTags.map((t) => {
            const on = tags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                aria-pressed={on}
                className={`h-9 rounded-full border px-4 text-[13px] transition-colors ${
                  on ? "border-accent bg-accent text-white" : "border-[#efe4dc] hover:border-accent hover:text-accent"
                }`}
              >
                {t === "spicy" && <Flame className="-mt-0.5 mr-1 inline size-3.5" />}
                {tagLabels[t]}
              </button>
            );
          })}
          <span className="ml-auto text-[13px] text-muted">
            {filtered.length} {plural(filtered.length)}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 text-[13px] text-accent hover:underline"
            >
              <X className="size-3.5" />
              Сбросить
            </button>
          )}
        </div>
      </div>

      {/* Товары */}
      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-[22px] bg-white px-6 py-16 text-center">
          <span className="text-5xl">🍣</span>
          <p className="mt-4 font-display text-[20px]">Ничего не нашлось</p>
          <p className="mt-2 text-[14px] text-muted">Попробуйте изменить запрос или сбросить фильтры</p>
          <button
            type="button"
            onClick={() => {
              resetFilters();
              setParam("category", null);
            }}
            className="mt-6 h-[43px] rounded-full bg-accent px-6 text-[14px] text-white shadow-accent transition hover:bg-accent-hover"
          >
            Показать всё меню
          </button>
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.slug} className="mt-8 first:mt-6 lg:mt-12" aria-label={g.title || activeTitle}>
            {g.title && (
              <h2 className="mb-5 flex items-baseline gap-3 font-display text-[22px] leading-[1.2] lg:mb-[26px] lg:text-[28px]">
                {g.title}
                <span className="font-sans text-[14px] text-muted">{g.items.length}</span>
              </h2>
            )}
            <ProductGrid>
              {g.items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductGrid>
          </section>
        ))
      )}
    </>
  );
}

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {children}
    </div>
  );
}

export function CatalogFallback() {
  return (
    <>
      <div className="mt-3 h-[44px] w-48 animate-skeleton rounded-[8px] bg-skeleton" />
      <div className="mt-9 flex gap-2.5 overflow-hidden">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="h-[48px] w-32 shrink-0 animate-skeleton rounded-full bg-white" />
        ))}
      </div>
      <div className="mt-6 h-[78px] animate-skeleton rounded-[22px] bg-white" />
      <div className="mt-6">
        <ProductGrid>
          {Array.from({ length: 8 }, (_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </ProductGrid>
      </div>
    </>
  );
}

function CategoryChip({
  active,
  onClick,
  image,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  image?: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-[48px] shrink-0 items-center gap-2.5 rounded-full pr-4 text-[14px] whitespace-nowrap transition-colors ${
        image ? "pl-1.5" : "pl-5"
      } ${active ? "bg-accent text-white shadow-accent" : "bg-white hover:text-accent"}`}
    >
      {image && (
        <Image src={image} alt="" width={36} height={36} className="size-9 rounded-full object-cover" />
      )}
      {children}
      <span className={`text-[12px] ${active ? "text-white/75" : "text-muted"}`}>{count}</span>
    </button>
  );
}

function PriceInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 5))}
      placeholder={placeholder}
      aria-label={`Цена ${placeholder}`}
      className="h-[46px] w-[84px] rounded-full bg-cream px-4 text-[14px] outline-none placeholder:text-muted focus:ring-2 focus:ring-accent/40"
    />
  );
}
