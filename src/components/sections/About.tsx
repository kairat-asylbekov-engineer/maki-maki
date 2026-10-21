import Image from "next/image";
import { aboutParagraphs } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

export function About() {
  return (
    <section id="about" className="container-main pt-14 lg:pt-[90px]">
      <div className="grid gap-8 md:grid-cols-2 md:gap-[22px]">
        <div>
          <h2 className="font-display text-[24px] leading-[1.17] md:text-[31px]">
            Суши и роллы от нас —<br className="hidden lg:block" /> это удобно и вкусно
          </h2>
          <div className="mt-5 space-y-5 text-[13px] leading-[20px] lg:mt-[12px] lg:pr-2">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ButtonLink href="/catalog" className="mt-7 lg:mt-[35px]">
            Смотреть меню
          </ButtonLink>
        </div>
        <div className="relative order-first h-[260px] overflow-hidden rounded-[14px] md:order-none md:h-[364px]">
          <Image
            src="/images/about.webp"
            alt="Сет суши и роллов на тёмной тарелке"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
