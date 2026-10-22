import type { Metadata } from "next";
import { CategoryPage } from "@/components/catalog/CategoryPage";
import { categories, findCategory } from "@/data/menu";

export function generateStaticParams() {
  return categories.flatMap((c) => (c.subs ?? []).map((s) => ({ category: c.slug, sub: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/catalog/[category]/[sub]">): Promise<Metadata> {
  const { category, sub } = await params;
  const title = findCategory(category)?.subs?.find((s) => s.slug === sub)?.title ?? "Каталог";
  return { title: `${title} — Maki Maki` };
}

export default async function Page({ params }: PageProps<"/catalog/[category]/[sub]">) {
  const { category, sub } = await params;
  return <CategoryPage slug={category} sub={sub} />;
}
