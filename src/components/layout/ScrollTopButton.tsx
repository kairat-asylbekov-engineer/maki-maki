"use client";

import { ChevronUp } from "lucide-react";

export function ScrollTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      className="-my-2 grid size-9 place-items-center rounded-full bg-white text-accent shadow-[0_4px_14px_-6px_rgb(255_91_74/0.4)] transition-colors hover:bg-accent hover:text-white"
    >
      <ChevronUp className="size-5" />
    </button>
  );
}
