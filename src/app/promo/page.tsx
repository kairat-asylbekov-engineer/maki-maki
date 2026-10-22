import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { promos } from "@/data/pages";

export const metadata: Metadata = { title: "Акции — Maki Maki" };

export default function PromoPage() {
  return (
    <PageShell crumbs={[{ href: "/", label: "Главная" }, { label: "Акции" }]} title="Акции" width="narrow">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {promos.map((p) => (
          <article key={p.slug} className="flex flex-col rounded-[22px] bg-white p-5">
            <Link href={`/promo/${p.slug}`} className="relative block aspect-[3/2] overflow-hidden rounded-[16px]">
              <Image src={p.image} alt="" fill sizes="(min-width: 768px) 260px, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
            </Link>
            <h2 className="mt-4 font-display text-[18px] leading-[1.2]">{p.title}</h2>
            <p className="mt-2 flex-1 text-[13px] leading-[1.5] text-ink/80">{p.short}</p>
            <Link
              href={`/promo/${p.slug}`}
              className="mt-4 grid h-[40px] place-items-center rounded-full bg-[#fdd5cf] text-[14px] transition-colors hover:bg-[#fcc3ba]"
            >
              Подробнее
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
