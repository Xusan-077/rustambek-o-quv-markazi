import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { INTL_LOCALE } from "@/i18n/routing";
import type { Locale, Localized, Placeholder } from "@/types/content";

// Teach tailwind-merge that our grid-paper utilities are background images,
// otherwise `bg-navy bg-grid` would be merged down to just `bg-grid`.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "bg-image": ["bg-grid", "bg-grid-light"] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Picks the value for `locale`; Karakalpak falls back to Uzbek. */
export function t<T>(localized: Localized<T>, locale: Locale): T {
  const value = locale === "kaa" ? localized.kaa : localized[locale];
  return value ?? localized.uz;
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return typeof value === "string" && value.startsWith("[") && value.endsWith("]");
}

export function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(INTL_LOCALE[locale], options).format(value);
}

export function formatCompact(value: number, locale: Locale) {
  return formatNumber(value, locale, { notation: "compact", maximumFractionDigits: 1 });
}

export function formatPercent(fraction: number, locale: Locale) {
  return formatNumber(fraction, locale, { style: "percent", maximumFractionDigits: 1 });
}

const TIME_ZONE = "Asia/Tashkent";

export function formatDate(
  iso: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" },
) {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], { timeZone: TIME_ZONE, ...options }).format(
    new Date(iso),
  );
}

export function formatTime(iso: string, locale: Locale) {
  return formatDate(iso, locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

/** Price in so'm, or the placeholder as-is while the client has not sent it. */
export function formatPrice(price: number | Placeholder, locale: Locale) {
  return isPlaceholder(price) ? price : formatNumber(price, locale);
}
