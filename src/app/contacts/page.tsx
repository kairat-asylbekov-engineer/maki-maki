import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { OkIcon, TelegramIcon, VkIcon, WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Контакты — Maki Maki" };

export default function ContactsPage() {
  return (
    <PageShell crumbs={[{ href: "/", label: "Главная" }, { label: "Контакты" }]} title="Контакты">
      <div className="grid items-stretch gap-4 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-[22px]">
        <div className="rounded-[22px] bg-white p-6 text-[14px] leading-[1.5] lg:p-[26px]">
          <div className="flex flex-wrap items-center gap-2">
            <a href={site.phoneHref} className="font-display text-[19px] transition-colors hover:text-accent">
              {site.phone}
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-7 place-items-center rounded-[7px] bg-[#25d366] text-white">
              <WhatsAppIcon className="size-[18px]" />
            </a>
            <a href={site.telegramHref} target="_blank" rel="noreferrer" aria-label="Telegram" className="grid size-7 place-items-center rounded-[7px] bg-[#229ed9] text-white">
              <TelegramIcon className="size-4" />
            </a>
          </div>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-muted">Режим работы</dt>
              {site.hours.map(([d, t]) => (
                <dd key={d}>
                  {d} {t}
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-muted">Адрес</dt>
              <dd>{site.address}</dd>
            </div>
            <div>
              <dt className="text-muted">E-mail</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Реквизиты</dt>
              <dd className="text-[13px]">{site.legal}</dd>
            </div>
          </dl>
          <div className="mt-6 flex gap-2">
            <a href={site.vkHref} target="_blank" rel="noreferrer" aria-label="ВКонтакте" className="grid size-9 place-items-center rounded-[9px] bg-vk text-white">
              <VkIcon className="size-[22px]" />
            </a>
            <a href={site.okHref} target="_blank" rel="noreferrer" aria-label="Одноклассники" className="grid size-9 place-items-center rounded-[9px] bg-ok text-white">
              <OkIcon className="size-5" />
            </a>
          </div>
        </div>
        <MapEmbed className="min-h-[320px] lg:min-h-[420px]" zoom={15} />
      </div>
    </PageShell>
  );
}
