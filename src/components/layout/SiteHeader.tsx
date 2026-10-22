"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, PhoneCall, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import { OkIcon, TelegramIcon, VkIcon } from "@/components/ui/icons";

/*
  Шапка как в шаблоне:
  — логотип с названием стоит в потоке и уезжает при прокрутке;
  — плашка меню и «В корзине» закреплены (fixed) в правом верхнем углу;
  — ниже lg меню прячется в бургер.
  Шапка лежит поверх страницы (absolute), поэтому у страниц есть верхний отступ — см. PageShell и Hero.
*/
export function SiteHeader() {
  const pathname = usePathname();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Закрываем меню при переходе на другую страницу
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const count = cart.hydrated ? cart.count : 0;

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-hero flex h-[76px] items-center lg:h-[84px] lg:pl-[15px] xl:h-[98px]">
        <Link href="/" className="flex items-center gap-3 lg:gap-[14px]" aria-label={`${site.name} — на главную`}>
          <Image
            src="/images/logo.webp"
            alt={`Логотип ${site.name}`}
            width={104}
            height={104}
            priority
            className="size-[46px] rounded-full ring-1 ring-black/5 lg:size-[52px]"
          />
          <span className="flex flex-col">
            <span className="font-display text-[16px] leading-[1.25] lg:text-[19px]">{site.name}</span>
            <span className="text-[12px] leading-[1.3] text-ink/80 max-[440px]:hidden lg:text-[14px]">{site.tagline}</span>
          </span>
        </Link>
      </div>

      {/* Закреплённая правая часть */}
      <div className="fixed top-[14px] right-4 z-40 flex items-center gap-2 lg:top-[10px] lg:right-[max(19px,calc((100vw-1202px)/2))] lg:gap-[12px]">
        <nav
          aria-label="Основное меню"
          className="hidden h-[64px] items-center rounded-full bg-white/90 pr-[10px] pl-[24px] shadow-[0_0_40px_-20px_rgb(25_25_25/0.25)] backdrop-blur-md lg:flex xl:h-[78px] xl:pr-[15px] xl:pl-[24px]"
        >
          <ul className="flex items-center gap-[15px] xl:gap-[20px]">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`py-[5px] text-[15px] transition-colors hover:text-accent xl:text-[17px] ${
                    isActive(item.href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.phoneHref}
            aria-label={`Позвонить: ${site.phone}`}
            title={site.phone}
            className="ml-[18px] grid size-[44px] place-items-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover xl:ml-[24px] xl:size-[45px]"
          >
            <PhoneCall className="size-[20px]" strokeWidth={1.6} />
          </a>
        </nav>

        <div className="flex h-[52px] items-center rounded-full bg-white/90 px-[6px] shadow-[0_0_40px_-20px_rgb(25_25_25/0.25)] backdrop-blur-md lg:h-[64px] lg:px-[8px] xl:h-[78px] xl:px-[10px]">
          <Link
            href="/cart"
            aria-label={`Корзина, товаров: ${count}`}
            className="flex h-[40px] items-center gap-2 rounded-full bg-accent pr-[6px] pl-[14px] text-[14px] text-white transition-colors hover:bg-accent-hover lg:h-[48px] lg:pl-[12px] lg:text-[16px] xl:text-[17px]"
          >
            <span className="max-sm:hidden">В корзине:</span>
            <span className="sm:hidden">Корзина</span>
            <span className="grid h-[28px] min-w-[28px] place-items-center rounded-full bg-white px-1.5 font-display text-[12px] text-accent">
              {count}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            className="ml-1.5 grid size-[40px] place-items-center rounded-full bg-cream text-ink lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-x-3 top-3 z-50 rounded-[26px] bg-page p-5 shadow-2xl transition-all duration-300 lg:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-[18px]">Меню</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Закрыть меню"
            className="grid size-10 place-items-center rounded-full bg-white"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="mt-4 grid grid-cols-2 gap-2" aria-label="Мобильное меню">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[16px] px-4 py-3.5 text-[16px] ${
                isActive(item.href) ? "bg-accent text-white" : "bg-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={site.phoneHref}
          className="mt-3 flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-display text-[16px] text-white"
        >
          <PhoneCall className="size-5" strokeWidth={1.6} />
          {site.phone}
        </a>
        <div className="mt-4 flex justify-center gap-2">
          <a href={site.vkHref} aria-label="ВКонтакте" className="grid size-10 place-items-center rounded-full bg-vk text-white">
            <VkIcon className="size-[22px]" />
          </a>
          <a href={site.okHref} aria-label="Одноклассники" className="grid size-10 place-items-center rounded-full bg-ok text-white">
            <OkIcon className="size-5" />
          </a>
          <a href={site.telegramHref} aria-label="Telegram" className="grid size-10 place-items-center rounded-full bg-[#229ed9] text-white">
            <TelegramIcon className="size-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
