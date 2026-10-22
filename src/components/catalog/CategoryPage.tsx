import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CatalogView } from "@/components/catalog/CatalogView";
import { byPopularity, findCategory, menu } from "@/data/menu";

/** Страница раздела (и подраздела) каталога — общая для /catalog/[category] и /catalog/[category]/[sub] */
export function CategoryPage({ slug, sub }: { slug: string; sub?: string }) {
  const category = findCategory(slug);
  if (!category) notFound();
  const subcategory = sub ? category.subs?.find((s) => s.slug === sub) : undefined;
  if (sub && !subcategory) notFound();

  const products = menu
    .filter((p) => p.category === category.slug && (!subcategory || p.sub === subcategory.slug))
    .sort(byPopularity);

  const chips = category.subs?.map((s) => ({
    href: s.slug === sub ? `/catalog/${category.slug}` : `/catalog/${category.slug}/${s.slug}`,
    label: s.title,
    active: s.slug === sub,
  }));

  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Главная" },
        { href: "/catalog", label: "Меню" },
        subcategory ? { href: `/catalog/${category.slug}`, label: category.title } : { label: category.title },
        ...(subcategory ? [{ label: subcategory.title }] : []),
      ]}
      title={subcategory?.title ?? category.title}
    >
      <CatalogView key={`${slug}/${sub ?? ""}`} products={products} chips={chips} chipStyle="soft" />
    </PageShell>
  );
}
