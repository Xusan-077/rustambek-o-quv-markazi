import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBook, getSite } from "./data";
import { type AppRoute, bookHref } from "./routes";
import { buildMetadata } from "./seo";
import { t } from "./utils";

type PageKey = "home" | "center" | "mock" | "books" | "courses" | "results" | "contact";

/** Shared `generateMetadata` body: titles and descriptions come from messages/*.json. */
export async function pageMetadata(
  params: Promise<{ locale: string }>,
  page: PageKey,
  path: AppRoute,
): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const [site, ui] = await Promise.all([getSite(), getTranslations({ locale, namespace: "meta" })]);

  return buildMetadata({
    locale,
    path,
    title: ui(`${page}Title`),
    description: ui(`${page}Description`),
    siteName: t(site.name, locale),
    absoluteTitle: page === "home",
  });
}

/** `generateMetadata` body for /kitoblar/[slug]. */
export async function bookMetadata(
  params: Promise<{ locale: string; slug: string }>,
): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const [site, book, ui] = await Promise.all([
    getSite(),
    getBook(slug),
    getTranslations({ locale, namespace: "bookDetail" }),
  ]);
  if (!book) return {};

  return buildMetadata({
    locale,
    path: bookHref(book.slug),
    title: ui("metaTitle", { title: book.title }),
    description: t(book.description, locale),
    siteName: t(site.name, locale),
  });
}
