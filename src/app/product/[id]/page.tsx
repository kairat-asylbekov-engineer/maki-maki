import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductRow } from "@/components/product/ProductRow";
import { DemoForm } from "@/components/ui/DemoForm";
import { byPopularity, findCategory, findProduct, menu } from "@/data/menu";
import { productStory, deliveryNote } from "@/data/pages";

export function generateStaticParams() {
  return menu.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);
  return product
    ? { title: `${product.title} — Maki Maki`, description: product.description }
    : { title: "Товар не найден — Maki Maki" };
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const category = findCategory(product.category)!;
  const sub = category.subs?.find((s) => s.slug === product.sub);
  const similar = menu.filter((p) => p.category === product.category && p.id !== product.id).sort(byPopularity);
  const recommended = menu
    .filter((p) => p.category !== product.category && p.id !== product.id)
    .sort(byPopularity)
    .slice(0, 8);

  const [protein, fat, carbs] = product.nutrition;
  const params_ = [
    ["Состав", product.composition],
    ["Порция", product.options.map((o) => o.label).join(" · ")],
    ["Калорийность", `${product.kcal} ккал`],
    ["Белки", `${protein} г`],
    ["Жиры", `${fat} г`],
    ["Углеводы", `${carbs} г`],
  ];

  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Главная" },
        { href: "/catalog", label: "Меню" },
        { href: `/catalog/${category.slug}`, label: category.title },
        ...(sub ? [{ href: `/catalog/${category.slug}/${sub.slug}`, label: sub.title }] : []),
        { label: product.title },
      ]}
      title={product.title}
    >
      <ProductHero product={product} />

      <div className="mt-4 space-y-4 lg:mt-[22px] lg:mr-[282px] lg:space-y-[22px]">
        <Card title="Описание">
          <p>{productStory.intro}</p>
          <ul className="mt-3 space-y-2 pl-4">
            {productStory.points.map((pt) => (
              <li key={pt} className="list-disc marker:text-accent">
                {pt}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Параметры">
          <dl className="space-y-3">
            {params_.map(([k, v]) => (
              <div key={k} className="flex items-end gap-2">
                <dt className="shrink-0">{k}</dt>
                <span className="mb-[5px] flex-1 border-b border-dotted border-ink/25" aria-hidden />
                <dd className="max-w-[60%] text-right text-ink/80">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card title="Отзывы о товаре">
          <p className="mb-4 text-muted">Пока нет отзывов — будьте первым!</p>
          <DemoForm
            fields={[
              { name: "name", label: "Имя", required: true },
              { name: "email", label: "E-mail", type: "email" },
              { name: "comment", label: "Комментарий", type: "textarea", required: true },
            ]}
            withRating
            successTitle="Спасибо за отзыв!"
            successText="Он появится на сайте после проверки модератором."
          />
        </Card>

        <Card title="Доставка">
          {deliveryNote.map((p) => (
            <p key={p.slice(0, 20)} className="mt-2 first:mt-0">
              {p}
            </p>
          ))}
        </Card>
      </div>

      <section className="mt-12 lg:mt-[60px]">
        <h2 className="heading-section">Находится в разделах</h2>
        <div className="mt-4 flex flex-wrap gap-2.5 lg:mt-5">
          <Link href={`/catalog/${category.slug}`} className="flex h-[38px] items-center rounded-full bg-[#fdd5cf] px-5 text-[15px] hover:bg-[#fcc3ba]">
            {category.title}
          </Link>
          {sub && (
            <Link
              href={`/catalog/${category.slug}/${sub.slug}`}
              className="flex h-[38px] items-center rounded-full bg-[#fdd5cf] px-5 text-[15px] hover:bg-[#fcc3ba]"
            >
              {sub.title}
            </Link>
          )}
        </div>
      </section>

      <ProductRow title="Похожие" products={similar} />
      <ProductRow title="Рекомендуемые" products={recommended} />
    </PageShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[22px] bg-white p-5 text-[13.5px] leading-[1.55] lg:p-[26px]">
      <h2 className="mb-3 font-display text-[18px] lg:text-[19px]">{title}</h2>
      {children}
    </section>
  );
}
