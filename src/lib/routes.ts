import type { SubjectSlug } from "@/types/content";

export const ROUTES = {
  home: "/",
  center: "/markaz",
  courses: "/kurslar",
  mock: "/mock",
  contact: "/aloqa",
  books: "/kitoblar",
  results: "/natijalar",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type AppRoute = (typeof ROUTES)[RouteKey];

/** A book's detail page: `/kitoblar/a-plus-100`. */
export type BookRoute = `${typeof ROUTES.books}/${string}`;

/** Any page of the site, static or per-item. */
export type SitePath = AppRoute | BookRoute;

export function bookHref(slug: string): BookRoute {
  return `${ROUTES.books}/${slug}`;
}

/**
 * Header order mirrors the site's priorities: the centre first, then courses and books.
 * Results live in the footer's "Qo'shimcha" column.
 */
export const NAV_ROUTES = [
  "center",
  "courses",
  "books",
  "contact",
] as const satisfies readonly RouteKey[];

/** In-page anchors shared between sections and links. */
export const ANCHORS = {
  enroll: "yozilish",
  faq: "savollar",
} as const;

/** Courses page: every course is a card with an id, so links jump to it (`/kurslar#matematika`). */
export function coursesHref(target?: SubjectSlug) {
  return target ? `${ROUTES.courses}#${target}` : ROUTES.courses;
}

export const ENROLL_HREF = `${ROUTES.courses}#${ANCHORS.enroll}`;
