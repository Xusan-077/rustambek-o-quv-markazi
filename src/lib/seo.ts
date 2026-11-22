import type { Metadata } from "next";
import { OG_LOCALE, routing } from "@/i18n/routing";
import type { Channel, CourseFormat, Locale, Localized, Site } from "@/types/content";
import type { SitePath } from "./routes";
import { t } from "./utils";

// TODO(client): production domain. Override with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rustambek.uz").replace(
  /\/$/,
  "",
);

/** "/uz" + "/mock" -> "/uz/mock"; the home route has no trailing slash. */
export function localizedPath(locale: Locale, path: SitePath) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function languageAlternates(path: SitePath) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = localizedPath(locale, path);
  languages["x-default"] = localizedPath(routing.defaultLocale, path);
  return languages;
}

interface BuildMetadataInput {
  locale: Locale;
  path: SitePath;
  title: string;
  description: string;
  siteName: string;
  /** Use the title as-is instead of "Title | Site". */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  siteName,
  absoluteTitle,
}: BuildMetadataInput): Metadata {
  const url = localizedPath(locale, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteName}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export function educationalOrganizationJsonLd(site: Site, channels: Channel[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: t(site.name, locale),
    alternateName: [site.name.kaa, site.name.uz].filter(Boolean),
    description: t(site.slogan, locale),
    url: `${SITE_URL}${localizedPath(locale, "/")}`,
    telephone: site.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressRegion: t(site.address.region, locale),
      addressLocality: t(site.address.district, locale),
    },
    // TODO(client): ish kunlari ma'lum bo'lgach openingHours qo'shish
    sameAs: [site.instagramUrl, ...channels.filter((c) => c.id === "main").map((c) => c.url)],
  };
}

/** One `Course` per subject, offered by the centre. Used on /kurslar. */
export function coursesJsonLd(
  site: Site,
  subjects: { name: Localized; description: Localized; formats: CourseFormat[] }[],
  locale: Locale,
) {
  const provider = {
    "@type": "EducationalOrganization",
    name: t(site.name, locale),
    url: `${SITE_URL}${localizedPath(locale, "/")}`,
  };
  return {
    "@context": "https://schema.org",
    "@graph": subjects.map((subject) => ({
      "@type": "Course",
      name: t(subject.name, locale),
      description: t(subject.description, locale),
      inLanguage: locale,
      provider,
      hasCourseInstance: subject.formats.map((format) => ({
        "@type": "CourseInstance",
        courseMode: format === "online" ? "online" : "onsite",
        ...(format === "offline"
          ? {
              location: {
                "@type": "Place",
                name: t(site.name, locale),
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "UZ",
                  addressRegion: t(site.address.region, locale),
                  addressLocality: t(site.address.district, locale),
                },
              },
            }
          : {}),
      })),
    })),
  };
}
