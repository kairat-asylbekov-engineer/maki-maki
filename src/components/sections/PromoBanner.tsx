import Image from "next/image";
import type { ReactNode } from "react";

export function PromoBanner({
  image,
  tone,
  title,
  text,
  action,
  className = "",
}: {
  image: string;
  tone: "dark" | "light";
  title: ReactNode;
  text: ReactNode;
  action: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <section className={`container-wide ${className}`}>
      <div
        className={`relative isolate flex min-h-[270px] items-center overflow-hidden rounded-[22px] ${
          dark ? "bg-[#0d0d0d] text-white" : "bg-[#fdebdf] text-ink"
        }`}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 1050px, 100vw"
          className="-z-10 object-cover object-[70%_center] lg:object-center"
        />
        {/* Подложка для читаемости на мобильных */}
        <div
          className={`absolute inset-0 -z-10 md:hidden ${
            dark ? "bg-gradient-to-r from-black/85 to-black/30" : "bg-gradient-to-r from-[#fdebdf]/95 to-[#fdebdf]/40"
          }`}
        />
        <div className="max-w-[560px] px-6 py-10 lg:px-[54px] lg:py-0">
          <h2 className="font-display text-[22px] leading-[1.3] lg:text-[26px] lg:leading-[1.32]">{title}</h2>
          <p className={`mt-3 text-[13px] leading-[1.5] lg:mt-[12px] ${dark ? "text-white/80" : "text-ink/85"}`}>{text}</p>
          <div className="mt-6 lg:mt-[22px]">{action}</div>
        </div>
      </div>
    </section>
  );
}
