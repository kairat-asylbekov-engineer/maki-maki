import { advantages } from "@/data/site";
import { FeatureIcon } from "@/components/ui/icons";

export function Advantages() {
  return (
    <section className="bg-[#fefefd]">
      <div className="container-main grid gap-6 py-10 sm:grid-cols-3 sm:gap-4 lg:h-[180px] lg:content-center lg:py-0">
        {advantages.map((item) => (
          <div key={item.title} className="flex items-center gap-[18px]">
            <span className="grid size-[60px] shrink-0 place-items-center rounded-full bg-cream">
              <FeatureIcon name={item.icon} className="size-[30px]" />
            </span>
            <div>
              <h3 className="font-display text-[15px] leading-[1.2]">{item.title}</h3>
              <p className="mt-[7px] text-[12px] leading-[1.35] text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
