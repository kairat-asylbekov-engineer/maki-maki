import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { DemoForm } from "@/components/ui/DemoForm";
import { reviews } from "@/data/site";

export const metadata: Metadata = { title: "Отзывы — Maki Maki" };

export default function ReviewsPage() {
  return (
    <PageShell crumbs={[{ href: "/", label: "Главная" }, { label: "Отзывы" }]} title="Отзывы" width="narrow">
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((r) => (
          <figure key={r.name} className="rounded-[22px] bg-white p-6">
            <figcaption className="flex items-center gap-3">
              <Image src={r.avatar} alt="" width={52} height={52} className="size-[52px] rounded-full object-cover" />
              <span>
                <span className="block font-display text-[15px]">{r.name}</span>
                <span className="block text-[12px] text-muted">{r.role}</span>
              </span>
            </figcaption>
            <blockquote className="mt-4 text-[14px] leading-[1.55] text-ink/85">{r.text}</blockquote>
          </figure>
        ))}
      </div>

      <section className="mt-10 rounded-[26px] bg-white p-6 lg:mt-12 lg:p-[40px]">
        <h2 className="mb-6 font-display text-[24px] lg:text-[30px]">Оставьте отзыв</h2>
        <DemoForm
          columns={4}
          fields={[
            { name: "name", label: "Имя" },
            { name: "phone", label: "Телефон", type: "tel", required: true },
            { name: "email", label: "E-mail", type: "email" },
            { name: "message", label: "Сообщение", type: "textarea", required: true },
          ]}
          withConsent
          successTitle="Спасибо за отзыв!"
          successText="Мы опубликуем его после проверки."
        />
      </section>
    </PageShell>
  );
}
