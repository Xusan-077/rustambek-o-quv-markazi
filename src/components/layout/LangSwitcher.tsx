"use client";

import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Flag } from "@/components/ui/Flag";
import { Icon } from "@/components/ui/Icon";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_LABELS, LOCALE_NAMES, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Custom dropdown: flag + code on the button, flag + full name in the list. Options are links. */
export function LangSwitcher({ label, className }: { label: string; className?: string }) {
  const pathname = usePathname();
  const current = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={cn("relative", className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${label}: ${LOCALE_NAMES[current]}`}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-touch cursor-pointer items-center gap-2 rounded-btn border border-line bg-surface px-3 text-sm font-semibold text-ink hover:border-brand motion-safe:transition-colors"
      >
        <Flag locale={current} />
        {LOCALE_LABELS[current]}
        <Icon
          icon={ChevronDown}
          size={16}
          className={cn("text-muted motion-safe:transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <ul className="absolute top-full right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-card border border-line bg-surface p-1.5 shadow-lift motion-safe:animate-[lang-pop_0.15s_ease-out]">
          {routing.locales.map((locale) => {
            const active = locale === current;
            return (
              <li key={locale}>
                <Link
                  href={pathname}
                  locale={locale}
                  hrefLang={locale}
                  lang={locale}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-touch items-center gap-3 rounded-btn px-3 font-medium motion-safe:transition-colors",
                    active ? "bg-brand-soft text-brand" : "text-ink hover:bg-paper",
                  )}
                >
                  <Flag locale={locale} className="h-5 w-7" />
                  <span className="flex-1">{LOCALE_NAMES[locale]}</span>
                  {active ? <Icon icon={Check} size={18} /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
