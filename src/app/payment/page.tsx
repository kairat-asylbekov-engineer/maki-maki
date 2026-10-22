import type { Metadata } from "next";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { payment } from "@/data/pages";

export const metadata: Metadata = { title: "Оплата — Maki Maki" };

const icons = { wallet: Wallet, card: CreditCard, online: Smartphone };

export default function PaymentPage() {
  return (
    <PageShell crumbs={[{ href: "/", label: "Главная" }, { label: "Оплата" }]} title="Оплата" width="narrow">
      <div className="grid gap-4 md:grid-cols-3">
        {payment.methods.map((m) => {
          const Icon = icons[m.icon];
          return (
            <div key={m.title} className="rounded-[22px] bg-white p-6">
              <span className="grid size-[52px] place-items-center rounded-full bg-cream">
                <Icon className="size-7" strokeWidth={1.4} />
              </span>
              <h2 className="mt-4 font-display text-[16px] leading-[1.25]">{m.title}</h2>
              <p className="mt-2 text-[13px] leading-[1.5] text-ink/80">{m.text}</p>
            </div>
          );
        })}
      </div>

      <h2 className="mt-12 font-display text-[22px] leading-[1.25] lg:text-[28px]">{payment.onlineTitle}</h2>
      <p className="mt-4 text-[15px] leading-[1.6]">{payment.onlineText}</p>
      <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {payment.systems.map((s) => (
          <li key={s} className="grid h-[64px] place-items-center rounded-[18px] bg-white font-display text-[14px] text-ink/80">
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[15px] leading-[1.6]">{payment.note}</p>
    </PageShell>
  );
}
