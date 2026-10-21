"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ShoppingBag } from "lucide-react";
import { formatPrice, site } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/#about", label: "О нас" },
  { href: "#contacts", label: "Контакты" },
];

// Шапка внутренних страниц (на главной шапка встроена в первый экран по макету)
export function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();

  return (
    <header className="container-main pt-4">
      <div className="flex h-[68px] items-center gap-4 rounded-[22px] bg-white pr-3 pl-4 shadow-[0_4px_20px_-12px_rgb(120_70_40/0.25)] lg:pr-4 lg:pl-5">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} — на главную`}>
          <Image src="/images/logo.webp" alt="" width={40} height={40} className="size-10 rounded-full" />
          <span className="flex flex-col">
            <span className="font-display text-[15.5px] leading-[1.25]">{site.name}</span>
            <span className="hidden text-[11.5px] leading-[1.3] text-ink/70 sm:block">{site.tagline}</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 md:flex" aria-label="Основное меню">
          {nav.map((item) => {
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
                  active ? "bg-cream text-accent" : "text-ink/80 hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[14px] font-medium transition-colors hover:text-accent lg:flex"
          >
            <Phone className="size-4 text-accent" />
            {site.phone}
          </a>
          <a
            href={site.phoneHref}
            aria-label="Позвонить"
            className="grid size-10 place-items-center rounded-full bg-cream text-accent lg:hidden"
          >
            <Phone className="size-[18px]" />
          </a>
          <button
            type="button"
            onClick={cart.open}
            className="flex h-10 items-center gap-2 rounded-full bg-accent pr-4 pl-3 text-white transition-colors hover:bg-accent-hover lg:ml-3"
            aria-label={`Корзина, товаров: ${cart.count}`}
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.8} />
            <span className="text-[14px] font-medium">{cart.count > 0 ? formatPrice(cart.total) : "Корзина"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
