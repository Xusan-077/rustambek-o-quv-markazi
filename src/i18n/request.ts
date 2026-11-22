import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function isObject(value: unknown): value is Messages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merges `override` onto `base`, so missing keys fall back to `base`. */
function mergeMessages(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = base[key];
    result[key] = isObject(baseValue) && isObject(value) ? mergeMessages(baseValue, value) : value;
  }
  return result;
}

export default getRequestConfig(async ({ locale: explicit }) => {
  // `[locale]` is a root param (app/[locale]/layout.tsx is the root layout), so it
  // can be read anywhere on the server; this replaces the deprecated setRequestLocale().
  const requested = explicit ?? (await rootLocale());
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const uz = (await import("../../messages/uz.json")).default as Messages;
  if (locale === "uz") return { locale, messages: uz };

  const own = (await import(`../../messages/${locale}.json`)).default as Messages;
  // Karakalpak keys that are not translated yet fall back to Uzbek.
  return { locale, messages: mergeMessages(uz, own) };
});
