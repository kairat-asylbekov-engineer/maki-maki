"use client";

import { rollOfTheDay } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { PromoBanner } from "./PromoBanner";

export function RollOfTheDay() {
  const cart = useCart();
  return (
    <PromoBanner
      className="mt-14 lg:mt-[90px]"
      image="/images/roll-of-day.webp"
      tone="dark"
      title="Счастливый ролл дня"
      text={
        <>
          Каждый день один ролл становится роллом дня
          <br className="hidden sm:block" /> по специальной цене
        </>
      }
      action={
        <Button onClick={() => cart.add(rollOfTheDay)}>
          Заказать сейчас
        </Button>
      }
    />
  );
}
