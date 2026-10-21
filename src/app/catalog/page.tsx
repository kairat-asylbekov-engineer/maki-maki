import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Catalog, CatalogFallback } from "@/components/catalog/Catalog";
import { RollOfTheDay } from "@/components/sections/RollOfTheDay";

export const metadata: Metadata = {
  title: "Каталог — Maki Maki",
  description: "Роллы, сеты, суши, сашими, напитки и соусы с доставкой от 30 минут.",
};

export default function CatalogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="container-main pt-7 lg:pt-9">
          <nav aria-label="Хлебные крошки">
            <ol className="flex items-center gap-1.5 text-[13px] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Главная
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li className="text-ink" aria-current="page">
                Каталог
              </li>
            </ol>
          </nav>
          <Suspense fallback={<CatalogFallback />}>
            <Catalog />
          </Suspense>
        </div>
        <RollOfTheDay />
      </main>
      <SiteFooter />
    </>
  );
}
