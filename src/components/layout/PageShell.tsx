import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";

export type Crumb = { href?: string; label: string };

/** Каркас внутренней страницы: отступ под шапку, хлебные крошки, заголовок, подвал */
export function PageShell({
  crumbs,
  title,
  children,
  width = "main",
  after,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  children: ReactNode;
  /** narrow — текстовые страницы (как в шаблоне: колонка ~800px) */
  width?: "main" | "narrow";
  /** Блоки на всю ширину после основного контента (баннеры) */
  after?: ReactNode;
}) {
  return (
    <>
      <main className="pt-[104px] lg:pt-[134px]">
        <div className={width === "narrow" ? "container-narrow" : "container-main"}>
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-5 font-display text-[30px] leading-[1.15] tracking-[-0.01em] md:text-[40px] lg:mt-[38px] lg:text-[46px]">
            {title}
          </h1>
          <div className="mt-6 lg:mt-[30px]">{children}</div>
        </div>
        {after}
      </main>
      <SiteFooter />
    </>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] lg:text-[14px]">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink/50">/</span>}
            {c.href ? (
              <Link href={c.href} className="text-accent underline underline-offset-2 hover:no-underline">
                {c.label}
              </Link>
            ) : (
              <span className="text-ink/70" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
