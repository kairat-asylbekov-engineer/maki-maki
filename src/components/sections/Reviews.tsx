import Image from "next/image";
import { reviews } from "@/data/site";

export function Reviews() {
  return (
    <section className="container-main pt-14 lg:pt-[90px]">
      <h2 className="heading-section">Отзывы наших клиентов</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-4 lg:mt-[26px] lg:gap-6">
        {reviews.map((r) => (
          <figure key={r.name} className="rounded-[22px] bg-white p-[21px] lg:min-h-[210px]">
            <figcaption className="flex items-center gap-[9px]">
              <Image
                src={r.avatar}
                alt=""
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
              />
              <span>
                <span className="block font-display text-[13px] leading-[1.3]">{r.name}</span>
                <span className="mt-[3px] block text-[10.5px] leading-[1.5] text-[#9a9a9a]">{r.role}</span>
              </span>
            </figcaption>
            <blockquote className="mt-[10px] text-[12px] leading-[18px] text-[#4a4a4a]">{r.text}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
