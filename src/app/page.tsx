import { Hero } from "@/components/sections/Hero";
import { Advantages } from "@/components/sections/Advantages";
import { CategoryTiles } from "@/components/sections/CategoryTiles";
import { Popular } from "@/components/sections/Popular";
import { RollOfTheDay } from "@/components/sections/RollOfTheDay";
import { WhyUs } from "@/components/sections/WhyUs";
import { About } from "@/components/sections/About";
import { Steps } from "@/components/sections/Steps";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Reviews } from "@/components/sections/Reviews";
import { Contacts } from "@/components/sections/Contacts";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice, site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Advantages />
      <main>
        <CategoryTiles />
        <Popular />
        <RollOfTheDay />
        <WhyUs />
        <About />
        <Steps />
        <PromoBanner
          className="mt-14 lg:mt-[90px]"
          image="/images/promo.webp"
          tone="light"
          title={
            <>
              Акция для новых
              <br />
              клиентов!
            </>
          }
          text={`При первом заказе от ${formatPrice(1500)} - Филадельфия в подарок!`}
          action={
            <ButtonLink href="#popular">
              Заказать сейчас
            </ButtonLink>
          }
        />
        <Reviews />
        <Contacts />
      </main>
      <footer className="container-contact pt-10 pb-16 text-[13px] lg:pt-[37px] lg:pb-[48px] lg:pl-2">
        Copyright © {site.year}
      </footer>
    </>
  );
}
