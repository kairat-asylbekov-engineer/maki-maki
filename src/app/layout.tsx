import type { Metadata, Viewport } from "next";
import "@fontsource/unbounded/400.css";
import "@fontsource/unbounded/500.css";
import "@fontsource/onest/300.css";
import "@fontsource/onest/400.css";
import "@fontsource/onest/500.css";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";

export const metadata: Metadata = {
  title: "Maki Maki — доставка суши и роллов",
  description:
    "Свежие ингредиенты, аккуратная подача и любовь в каждом ролле. Доставка суши и роллов от 30 минут.",
};

export const viewport: Viewport = {
  themeColor: "#ff5b4a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
