import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = { title: "Корзина — Maki Maki" };

export default function Page() {
  return (
    <PageShell
      crumbs={[{ href: "/", label: "Главная" }, { href: "/catalog", label: "Меню" }, { label: "Корзина" }]}
      title="Корзина"
    >
      <CartPage />
    </PageShell>
  );
}
