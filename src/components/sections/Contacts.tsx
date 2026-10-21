import Image from "next/image";
import { site } from "@/data/site";
import { OkIcon, TelegramIcon, VkIcon } from "@/components/ui/icons";

export function Contacts() {
  return (
    <section className="container-contact grid gap-4 pt-14 md:grid-cols-2 lg:gap-[22px] lg:pt-[73px]">
      {/* Мы на связи */}
      <div className="relative isolate min-h-[175px] overflow-hidden rounded-[22px] bg-[#191919] px-[30px] py-[30px] text-white">
        <Image
          src="/images/contact.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="-z-10 object-cover object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#191919] via-[#191919]/70 to-transparent lg:hidden" />
        <h2 className="font-display text-[20px] leading-[1.15]">
          Мы на связи
          <br />
          по любым вопросам
        </h2>
        <a
          href={site.phoneHref}
          className="mt-[4px] inline-block font-display text-[17px] leading-[1.3] transition-colors hover:text-accent"
        >
          {site.phone}
        </a>
        <div className="mt-[12px] flex gap-[5px]">
          <a
            href={site.vkHref}
            target="_blank"
            rel="noreferrer"
            aria-label="ВКонтакте"
            className="grid size-[37px] place-items-center rounded-full bg-vk text-white transition-transform hover:-translate-y-0.5"
          >
            <VkIcon className="size-[22px]" />
          </a>
          <a
            href={site.okHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Одноклассники"
            className="grid size-[37px] place-items-center rounded-full bg-ok text-white transition-transform hover:-translate-y-0.5"
          >
            <OkIcon className="size-[20px]" />
          </a>
        </div>
      </div>

      {/* Телеграм-канал */}
      <a
        href={site.telegramHref}
        target="_blank"
        rel="noreferrer"
        className="group relative isolate block min-h-[175px] overflow-hidden rounded-[22px] bg-accent px-[30px] py-[30px] text-white"
      >
        <Image
          src="/images/telegram.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="-z-10 object-cover object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent via-accent/80 to-transparent lg:hidden" />
        <div className="flex items-center gap-[15px]">
          <Image
            src="/images/logo.webp"
            alt=""
            width={75}
            height={75}
            className="size-[75px] shrink-0 rounded-full ring-4 ring-white"
          />
          <p className="max-w-[200px] font-display text-[16px] leading-[19px]">
            Подписывайтесь на наш канал «{site.telegramChannel}»
          </p>
        </div>
        <p className="mt-[13px] max-w-[300px] text-[12px] max-sm:pr-16 leading-[19px] font-light text-white/90">
          Подробная информация о новинках, сезонных предложениях и скидках.
        </p>
        <span className="absolute top-[30px] right-[30px] grid size-[75px] place-items-center rounded-full bg-[#1f1f1f] transition-transform duration-300 group-hover:scale-105 max-sm:top-auto max-sm:right-4 max-sm:bottom-4 max-sm:size-14">
          <TelegramIcon className="size-[38px] -translate-x-[2px] text-white max-sm:size-7" />
        </span>
      </a>
    </section>
  );
}
