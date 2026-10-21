import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-accent text-white text-[14px] leading-none shadow-accent transition-[background-color,transform] duration-200 hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type Size = "md" | "lg";
const sizes: Record<Size, string> = {
  md: "h-[43px] px-[23px]",
  lg: "h-[51px] px-[18px]",
};

export function ButtonLink({
  href,
  children,
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  size?: Size;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  size = "md",
  className = "",
  ...rest
}: ComponentProps<"button"> & { size?: Size }) {
  return (
    <button type="button" className={`${base} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
