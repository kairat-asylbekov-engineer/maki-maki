import type { Metadata } from "next";
import { Clock, Wallet } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { delivery } from "@/data/pages";

export const metadata: Metadata = { title: "Доставка — Maki Maki" };

export default function DeliveryPage() {
  return (
    <PageShell crumbs={[{ href: "/", label: "Главная" }, { label: "Доставка" }]} title="Доставка" width="narrow">
      <div className="space-y-3 text-[15px] leading-[1.6]">
        {delivery.intro.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {delivery.options.map((o) => (
          <div key={o.title} className="rounded-[22px] bg-white p-6">
            <h2 className="font-display text-[19px] leading-[1.2]">{o.title}</h2>
            <p className="mt-3 flex items-center gap-2 font-display text-[14px]">
              <Clock className="size-4 shrink-0 text-accent" /> {o.time}
            </p>
            <p className="mt-1 flex items-center gap-2 font-display text-[14px]">
              <Wallet className="size-4 shrink-0 text-accent" /> {o.price}
            </p>
            <p className="mt-3 text-[13px] leading-[1.5] text-ink/80">{o.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-[15px] leading-[1.6]">{delivery.zonesIntro}</p>
      <MapEmbed className="mt-4 h-[300px] md:h-[380px]" zoom={10} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {delivery.zones.map((z) => (
          <div key={z.title} className="rounded-[20px] bg-white p-5">
            <p className="flex items-center gap-2 font-display text-[15px] leading-[1.2]">
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: z.color }} />
              {z.title}
            </p>
            <p className="mt-2 text-[13px] leading-[1.5] text-ink/80">{z.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[15px] leading-[1.6]">{delivery.outro}</p>
    </PageShell>
  );
}
