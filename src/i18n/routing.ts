import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "kaa", "ru"],
  defaultLocale: "uz",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Short labels shown in the language switcher. Karakalpak is shown as "QQ". */
export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "UZ",
  kaa: "QQ",
  ru: "RU",
};

/** Full names, read by screen readers and shown as tooltips. */
export const LOCALE_NAMES: Record<Locale, string> = {
  uz: "Özbekça",
  kaa: "Qaraqalpaqsha",
  ru: "Русский",
};

/** Intl has no Karakalpak data, so number/date formatting borrows Uzbek. */
export const INTL_LOCALE: Record<Locale, string> = {
  uz: "uz-Latn-UZ",
  kaa: "uz-Latn-UZ",
  ru: "ru-RU",
};

export const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  kaa: "kaa_UZ",
  ru: "ru_RU",
};
