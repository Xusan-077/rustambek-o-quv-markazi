import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBooks } from "@/lib/data";
import { bookHref, ROUTES } from "@/lib/routes";
import { languageAlternates, localizedPath, SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const absolute = (path: string) => `${SITE_URL}${path}`;
  const books = await getBooks();

  const bookPages = books.flatMap((book) =>
    routing.locales.map((locale) => ({
      url: absolute(localizedPath(locale, bookHref(book.slug))),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(bookHref(book.slug))).map(([lang, path]) => [
            lang,
            absolute(path),
          ]),
        ),
      },
    })),
  );

  const pages = Object.values(ROUTES)
    .filter((route) => (route as string) !== ROUTES.mock)
    .flatMap((route) =>
      routing.locales.map((locale) => ({
        url: absolute(localizedPath(locale, route)),
        changeFrequency: route === ROUTES.home ? ("weekly" as const) : ("monthly" as const),
        priority:
          route === ROUTES.home
            ? 1
            : route === ROUTES.center || route === ROUTES.courses
              ? 0.9
              : 0.7,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languageAlternates(route)).map(([lang, path]) => [lang, absolute(path)]),
          ),
        },
      })),
    );

  return [...pages, ...bookPages];
}
