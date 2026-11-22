/** Small helpers that turn content into display values for props. No data access here. */
import type { Book, BookDelivery, Locale, Localized, Site, SubjectSlug } from "@/types/content";
import { formatNumber, formatPrice, isPlaceholder, t } from "./utils";

type NamedSubject = { slug: SubjectSlug; name: Localized };

export function subjectOptions(subjects: NamedSubject[], locale: Locale) {
  return subjects.map((subject) => ({ slug: subject.slug, name: t(subject.name, locale) }));
}

export function subjectNameMap(subjects: NamedSubject[], locale: Locale) {
  return Object.fromEntries(
    subjects.map((subject) => [subject.slug, t(subject.name, locale)]),
  ) as Record<SubjectSlug, string>;
}

/** "Region, District, [street]" */
export function formatAddress(site: Site, locale: Locale) {
  return [
    t(site.address.region, locale),
    t(site.address.district, locale),
    site.address.street,
  ].join(", ");
}

/** Grid card props for a book (home page and /kitoblar). */
export function shelfBooks(books: Book[], locale: Locale) {
  return books.map((book) => ({
    slug: book.slug,
    title: book.title,
    series: t(book.series, locale),
    description: t(book.description, locale),
    cover: book.cover,
  }));
}

/** Public file paths may hold spaces and brackets ("A+100 Kitobi (demo).pdf"): make them URL-safe. */
export function publicFileUrl(path: string | null) {
  return path ? encodeURI(path) : null;
}

/** URLs of the pre-rendered demo pages: /books/demo/<slug>/01.jpg ... (see scripts/render-book-demos.ps1). */
export function demoPageUrls(book: Book) {
  if (!book.demo) return [];
  return Array.from(
    { length: book.demo.pages },
    (_, i) => `/books/demo/${book.slug}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

/** Delivery time and cost for display; placeholders pass through. */
export function deliveryFacts(delivery: BookDelivery, locale: Locale) {
  return {
    time: isPlaceholder(delivery.time) ? delivery.time : t(delivery.time, locale),
    cost: formatPrice(delivery.cost, locale),
  };
}

/** Pages count or price for display; placeholders like "[BET]" pass through. */
export function bookFacts(book: Book, locale: Locale) {
  return {
    pages: isPlaceholder(book.pages) ? book.pages : formatNumber(book.pages, locale),
    price: formatPrice(book.price, locale),
  };
}
