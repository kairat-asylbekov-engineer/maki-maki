import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CatalogView } from "@/components/catalog/CatalogView";
import { byPopularity, categories, menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Каталог — Maki Maki",
  description: "Роллы, сеты, суши, сашими, напитки и соусы с доставкой от 30 минут.",
};

const products = [...menu].sort(byPopularity);

export default function CatalogPage() {
  return (
    <PageShell crumbs={[{ href: "/", label: "Главная" }, { label: "Меню" }]} title="Каталог">
      <CatalogView
        products={products}
        chips={categories.map((c) => ({ href: `/catalog/${c.slug}`, label: c.title }))}
      />
    </PageShell>
  );
}
