import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { heroCategories, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

const cardTheme = {
  dark: "bg-[#141414] text-white",
  light: "bg-[#f6e9dc] text-ink",
  accent: "bg-[#f26450] text-white",
};

// На узких карточках фото уходит под текст — добавляем мягкую подложку
const cardOverlay = {
  dark: "from-black/80 via-black/45",
  light: "from-[#f6e9dc] via-[#f6e9dc]/70",
  accent: "from-[#f26450] via-[#f26450]/70",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fdebdf] lg:h-[600px]">
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] lg:object-center"
      />
      {/* Осветление слева на узких экранах, чтобы текст читался */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdebdf]/95 via-[#fdebdf]/80 to-[#fdebdf]/20 md:bg-gradient-to-r md:from-[#fdebdf]/90 md:via-[#fdebdf]/40 md:to-transparent lg:hidden" />

      <div className="container-hero relative">
        {/* Шапка */}
        <header className="flex items-center gap-3 pt-4 lg:pl-[15px]">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — на главную`}>
            <Image
              src="/images/logo.webp"
              alt={`Логотип ${site.name}`}
              width={40}
              height={40}
              className="size-10 rounded-full ring-1 ring-black/5"
            />
            <span className="flex flex-col">
              <span className="font-display text-[15.5px] leading-[1.25]">{site.name}</span>
              <span className="text-[11.5px] leading-[1.3] text-ink/80">{site.tagline}</span>
            </span>
          </Link>
        </header>

        {/* Заголовок */}
        <div className="pt-12 lg:pt-[61px]">
          <h1 className="font-display text-[36px] leading-[1.12] tracking-[-0.01em] sm:text-[44px] lg:text-[49px] lg:leading-[1.12]">
            Вкус Японии
            <br />у вас дома
          </h1>
          <p className="mt-3 max-w-[400px] text-[16px] leading-[1.3] text-ink/85 lg:mt-[4px] lg:text-[19px] lg:leading-[1.27]">
            Свежие ингредиенты, аккуратная подача и&nbsp;любовь в каждом роле 🖤
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-[24px]">
            <ButtonLink href="/catalog" size="lg" className="px-[18px] text-[14px] whitespace-nowrap">
              Перейти в каталог
              <ArrowRight className="size-4" strokeWidth={2} />
            </ButtonLink>
            <div className="flex h-[66px] items-center gap-2.5 rounded-[20px] bg-[#fdf5f0]/95 pr-[22px] pl-[17px] shadow-[0_6px_20px_-8px_rgb(200_120_80/0.25)]">
              <Clock className="size-[22px] text-accent" strokeWidth={1.6} />
              <span className="flex flex-col">
                <span className="text-[14px] leading-[1.25]">Быстрая доставка</span>
                <span className="text-[11px] leading-[1.4] text-ink/75">от 30 минут</span>
              </span>
            </div>
          </div>
        </div>

        {/* Категории */}
        <div className="mt-10 grid grid-cols-2 gap-3 pb-8 md:grid-cols-4 lg:mt-[33px] lg:gap-[15px] lg:pb-0">
          {heroCategories.map((cat) => (
            <Link
              key={cat.title}
              href={`/catalog?category=${cat.slug}`}
              className={`group relative isolate h-[145px] overflow-hidden rounded-[20px] ${cardTheme[cat.theme]}`}
            >
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="-z-10 object-cover object-right transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-r to-transparent lg:hidden ${cardOverlay[cat.theme]}`}
              />
              <div className="flex h-full flex-col p-[18px] pt-[17px]">
                <h3 className="font-display text-[17px] leading-[1.15] whitespace-pre-line">{cat.title}</h3>
                {cat.text && (
                  <p className="mt-[8px] text-[12px] leading-[1.33] whitespace-pre-line opacity-85">{cat.text}</p>
                )}
                <span className="mt-auto grid size-[37px] place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="size-[17px]" strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
