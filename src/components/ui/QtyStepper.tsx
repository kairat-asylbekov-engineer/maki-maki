"use client";

import { Minus, Plus } from "lucide-react";

/** Счётчик количества как в шаблоне: розовые круглые кнопки − / + */
export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className = "",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const btn =
    size === "lg"
      ? "size-[38px]"
      : "size-[30px]";
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Меньше"
        className={`${btn} grid place-items-center rounded-full bg-[#ffe9e6] text-accent transition-colors hover:bg-[#ffd8d2] disabled:opacity-50`}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-[14px] tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Больше"
        className={`${btn} grid place-items-center rounded-full bg-[#ffd8d2] text-accent transition-colors hover:bg-[#ffc6be] disabled:opacity-50`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
