import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { promos } from "@/data/pages";

export function generateStaticParams() {
  return promos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/promo/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${promos.find((p) => p.slug === slug)?.title ?? "Акция"} — Maki Maki` };
}

export default async function PromoDetailPage({ params }: PageProps<"/promo/[slug]">) {
  const { slug } = await params;
  const promo = promos.find((p) => p.slug === slug);
  if (!promo) notFound();

  return (
    <PageShell
      crumbs={[{ href: "/", label: "Главная" }, { href: "/promo", label: "Акции" }, { label: promo.title }]}
      title={promo.title}
      width="narrow"
    >
      <div className="grid items-start gap-6 rounded-[22px] bg-white p-5 md:grid-cols-2 lg:p-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
          <Image src={promo.image} alt="" fill priority sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-3 text-[15px] leading-[1.6]">
          {promo.text.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
          <ButtonLink href={promo.cta.href} className="mt-3">
            {promo.cta.label}
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
