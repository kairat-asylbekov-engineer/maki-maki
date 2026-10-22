"use client";

import { useState, type FormEvent } from "react";
import { Check, Star } from "lucide-react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "textarea";
  required?: boolean;
  placeholder?: string;
};

/**
 * Форма для демо: проверяет обязательные поля и показывает сообщение об успехе.
 * Данные никуда не отправляются — в рабочей версии здесь будет запрос к API / Telegram-боту.
 */
export function DemoForm({
  fields,
  submitLabel = "Отправить",
  successTitle = "Спасибо!",
  successText = "Мы получили ваше сообщение.",
  withRating = false,
  withConsent = false,
  columns = 1,
}: {
  fields: Field[];
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  withRating?: boolean;
  withConsent?: boolean;
  columns?: 1 | 4;
}) {
  const [sent, setSent] = useState(false);
  const [rating, setRating] = useState(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex items-center gap-4 rounded-[18px] bg-cream p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-white">
          <Check className="size-6" strokeWidth={2.4} />
        </span>
        <div>
          <p className="font-display text-[17px]">{successTitle}</p>
          <p className="mt-1 text-[14px] text-muted">{successText}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="text-[14px]">
      <div className={`grid gap-4 ${columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : ""}`}>
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span>
              {f.label}
              {f.required && <span className="text-accent"> *</span>}
            </span>
            {f.type === "textarea" ? (
              <textarea
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                rows={columns === 4 ? 1 : 4}
                className="mt-1.5 block min-h-[46px] w-full resize-y rounded-[16px] border border-[#ecdfd9] bg-white px-4 py-3 outline-none focus:border-accent"
              />
            ) : (
              <input
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                className="mt-1.5 block h-[46px] w-full rounded-full border border-[#ecdfd9] bg-white px-4 outline-none focus:border-accent"
              />
            )}
          </label>
        ))}
      </div>

      {withRating && (
        <fieldset className="mt-4">
          <legend>Оценка</legend>
          <div className="mt-1.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`Оценка ${n}`}
                aria-pressed={rating === n}
                className="text-[#f6c344]"
              >
                <Star className="size-6" fill={n <= rating ? "currentColor" : "none"} strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {withConsent && (
        <label className="mt-4 flex cursor-pointer items-start gap-2.5">
          <input type="checkbox" required className="mt-0.5 size-4 accent-[#ff5b4a]" />
          <span>
            Я принимаю условия обработки моих <span className="text-accent">персональных данных</span>
            <span className="text-accent"> *</span>
          </span>
        </label>
      )}

      <button
        type="submit"
        className="mt-5 h-[43px] rounded-full bg-accent px-7 text-[14px] text-white shadow-accent transition-colors hover:bg-accent-hover"
      >
        {submitLabel}
      </button>
    </form>
  );
}
