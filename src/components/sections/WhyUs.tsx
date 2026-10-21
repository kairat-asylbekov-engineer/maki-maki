import { reasons } from "@/data/site";
import { FeatureIcon } from "@/components/ui/icons";

export function WhyUs() {
  return (
    <section className="container-main pt-14 lg:pt-[90px]">
      <h2 className="heading-section">Почему выбирают нас</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-4 lg:mt-[26px] lg:gap-6">
        {reasons.map((item) => (
          <div key={item.title} className="rounded-[22px] bg-white p-[21px] lg:min-h-[193px]">
            <span className="grid size-[60px] place-items-center rounded-full bg-cream">
              <FeatureIcon name={item.icon} className="size-[30px]" />
            </span>
            <h3 className="mt-[11px] font-display text-[15px] leading-[18px] whitespace-pre-line">{item.title}</h3>
            <p className="mt-[7px] text-[12px] leading-[18px] text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
