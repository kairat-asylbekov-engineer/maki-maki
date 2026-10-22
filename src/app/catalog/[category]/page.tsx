import type { Metadata } from "next";
import { CategoryPage } from "@/components/catalog/CategoryPage";
import { categories, findCategory } from "@/data/menu";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalog/[category]">): Promise<Metadata> {
  const { category } = await params;
  return { title: `${findCategory(category)?.title ?? "Каталог"} — Maki Maki` };
}

export default async function Page({ params }: PageProps<"/catalog/[category]">) {
  const { category } = await params;
  return <CategoryPage slug={category} />;
}
