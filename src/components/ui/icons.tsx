import type { SVGProps } from "react";
import type { LucideProps } from "lucide-react";
import { Award, Fish, HandCoins, Smile, Snowflake, ThumbsUp } from "lucide-react";

// Коробка с часами — «быстрая доставка», как в макете
function DeliveryBox({ strokeWidth = 1.4, ...props }: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 20.5H5.5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2V11" />
      <path d="M9 3.5v4l2-1.2 2 1.2v-4" />
      <circle cx="16.5" cy="17" r="4.5" />
      <path d="M16.5 15v2.2l1.4 1" />
    </svg>
  );
}

export const featureIcons = {
  snowflake: Snowflake,
  award: Award,
  thumbs: ThumbsUp,
  fish: Fish,
  delivery: DeliveryBox,
  payment: HandCoins,
  smile: Smile,
} as const;

export type FeatureIconName = keyof typeof featureIcons;

export function FeatureIcon({ name, className }: { name: FeatureIconName; className?: string }) {
  const Icon = featureIcons[name];
  return <Icon className={className} strokeWidth={1.4} aria-hidden />;
}

export function VkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.79 17.5C6.88 17.5 3.5 13.44 3.36 6.69h2.96c.1 4.96 2.28 7.06 4.01 7.49V6.69h2.79v4.28c1.7-.18 3.5-2.13 4.1-4.28H20c-.46 2.64-2.4 4.59-3.78 5.39 1.38.65 3.6 2.35 4.44 5.42h-3.07c-.66-2.06-2.3-3.65-4.47-3.86v3.86h-.33Z" />
    </svg>
  );
}

export function OkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 12.2a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Zm0-5.8a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm1.66 9.12a7.7 7.7 0 0 0 2.38-.99 1.2 1.2 0 1 0-1.28-2.03 5.2 5.2 0 0 1-5.52 0 1.2 1.2 0 1 0-1.28 2.03c.74.47 1.55.8 2.38.99l-2.3 2.3a1.2 1.2 0 1 0 1.7 1.7L12 17.26l2.26 2.26a1.2 1.2 0 1 0 1.7-1.7l-2.3-2.3Z" />
    </svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.43 3.2a1.1 1.1 0 0 0-1.15-.15L2.9 10.1c-.94.38-.9 1.73.06 2.05l4.2 1.4 1.62 5.1c.2.64 1 .84 1.48.38l2.4-2.3 4.36 3.2c.6.44 1.45.12 1.62-.6l3.18-14.04a1.1 1.1 0 0 0-.39-1.1ZM9.9 14.03l-.7 3.03-1.08-3.48 9.83-6.4-8.05 6.85Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2.5a9.4 9.4 0 0 0-8.1 14.18L2.5 21.5l4.95-1.4a9.4 9.4 0 1 0 4.59-17.6Zm0 17.16c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-2.94.83.85-2.86-.2-.31a7.76 7.76 0 1 1 6.84 3.69Zm4.26-5.8c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.52.12-.16.23-.6.75-.74.9-.13.16-.27.18-.5.06a6.35 6.35 0 0 1-3.15-2.75c-.24-.41.24-.38.68-1.27.08-.15.04-.29-.02-.4-.06-.12-.52-1.26-.72-1.72-.19-.45-.38-.39-.52-.4h-.45a.86.86 0 0 0-.62.3 2.6 2.6 0 0 0-.81 1.93c0 1.14.83 2.24.95 2.4.11.15 1.63 2.5 3.96 3.5 1.47.64 2.05.69 2.78.58.45-.07 1.38-.56 1.57-1.11.2-.55.2-1.02.14-1.12-.06-.1-.21-.16-.44-.27Z" />
    </svg>
  );
}
