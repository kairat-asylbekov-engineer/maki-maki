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
