import { steps } from "@/data/site";

export function Steps() {
  return (
    <section className="container-main pt-12 lg:pt-[53px]">
      <div className="rounded-[24px] bg-white px-5 py-10 lg:px-[55px] lg:pt-[51px] lg:pb-[54px]">
        <h2 className="text-center font-display text-[22px] leading-[1.2] md:text-[28px]">
          От меню до двери: 4&nbsp;шага
        </h2>
        <ol className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 lg:mt-[23px] lg:gap-6">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex min-h-[139px] flex-col items-center rounded-[22px] bg-cream px-5 pt-[21px] pb-5"
            >
              <span className="grid size-[43px] shrink-0 place-items-center rounded-full bg-white font-display text-[19px] text-accent shadow-num">
                {i + 1}
              </span>
              <span className="mt-[21px] font-display text-[15px] leading-[18px]">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
