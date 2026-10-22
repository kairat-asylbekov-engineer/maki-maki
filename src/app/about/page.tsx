import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { about } from "@/data/pages";

export const metadata: Metadata = { title: "О нас — Maki Maki" };

export default function AboutPage() {
  return (
    <PageShell crumbs={[{ href: "/", label: "Главная" }, { label: "О нас" }]} title="О нас" width="narrow">
      <div className="space-y-4 text-[15px] leading-[1.6]">
        {about.intro.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <h2 className="mt-10 font-display text-[22px] leading-[1.25] lg:mt-12 lg:text-[28px]">{about.popularTitle}</h2>
      <ul className="mt-4 space-y-1.5 pl-5 text-[15px] leading-[1.6]">
        {about.popular.map((li) => (
          <li key={li} className="list-disc marker:text-accent">
            {li}
          </li>
        ))}
      </ul>

      {about.sections.map((s) => (
        <section key={s.title}>
          <h2 className="mt-10 font-display text-[22px] leading-[1.25] lg:mt-12 lg:text-[28px]">{s.title}</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-[1.6]">
            {s.text.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <h2 className="mt-12 text-center font-display text-[24px] lg:mt-16 lg:text-[30px]">{about.reasonsTitle}</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {about.reasons.map((r) => (
          <div key={r.title} className="w-full rounded-[22px] bg-white p-6 sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]">
            <h3 className="font-display text-[16px] leading-[1.25]">{r.title}</h3>
            <p className="mt-2 text-[13px] leading-[1.5] text-ink/80">{r.text}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
