import type { Locale } from "@/i18n/routing";

export type { Locale };

/**
 * Localized content. `kaa` is optional: when a Karakalpak translation is missing,
 * `t()` falls back to `uz`. Mark every omission with `// TODO(kaa)`.
 */
export type Localized<T = string> = Record<Exclude<Locale, "kaa">, T> & Partial<Record<"kaa", T>>;

/** Data the client has not given us yet, e.g. "[NARX]". Always paired with `// TODO(client)`. */
export type Placeholder = `[${string}]`;

export type IsoDateTime = string;

export type ChannelId = "main" | "admin" | "books" | "onlineCourse" | "offline" | "bot";

export interface Channel {
  id: ChannelId;
  handle: string;
  url: string;
  purpose: Localized;
}

export interface Phone {
  display: string;
  tel: string;
}

export interface Site {
  name: Localized;
  slogan: Localized;
  address: {
    region: Localized;
    district: Localized;
    street: string | Placeholder;
  };
  phones: Phone[];
  workHours: { opens: string; closes: string };
  telegramSubscribers: number;
  instagramUrl: string;
  /** Link that opens the centre in a maps app ("Yo'nalish olish"). */
  mapUrl: string;
  /** Embeddable map or static image; placeholder until the client sends the exact pin. */
  mapEmbedUrl: string | Placeholder;
  buildingPhoto: string | null;
  founderPhoto: string | null;
  gallery: GalleryPhoto[];
  payment: {
    cardHolder: string;
    cardNumber: string | Placeholder;
  };
}

export interface GalleryPhoto {
  id: string;
  src: string | null;
  alt: Localized;
}

export const SUBJECT_SLUGS = ["matematika", "ingliz-tili", "rus-tili"] as const;
export type SubjectSlug = (typeof SUBJECT_SLUGS)[number];

/** How a subject's course runs. */
export interface CoursePlan {
  months: number;
  lessonsPerWeek: number;
  lessonMinutes: number;
}

export interface Subject {
  slug: SubjectSlug;
  name: Localized;
  description: Localized;
  isPrimary: boolean;
  hasMock: boolean;
  plan: CoursePlan;
  /** Short points shown under the plan on the course card. */
  features: Localized<string[]>;
}

export type MockStatus = "upcoming" | "open" | "finished";
export type MockFormat = "online" | "offline";

export interface Mock {
  number: number;
  subject: SubjectSlug;
  /** ISO date-time with the Tashkent offset, or null when unknown. */
  startsAt: IsoDateTime | null;
  durationMinutes: number;
  questionCount: number;
  price: number;
  languages: Locale[];
  formats: MockFormat[];
  status: MockStatus;
  videoSolutionUrl?: string;
}

export const GRADES = ["A+", "A", "B+", "B", "C+", "C", "none"] as const;
export type Grade = (typeof GRADES)[number];

/** Points range of one national-certificate level. The top level has no upper bound. */
export interface GradeBand {
  level: Exclude<Grade, "none">;
  from: number;
  to?: number;
}

export interface MockResult {
  mockNumber: number;
  /** Participants per grade. Totals and percentages are computed, never stored. */
  distribution: Record<Grade, number>;
}

export interface Video {
  title: Localized;
  url: string;
}

export interface CertificateHolder {
  id: string;
  name: string | Placeholder;
  district: string | Placeholder;
  grade: Exclude<Grade, "none">;
  photo: string | null;
}

/** A certificate picture shown in the home carousel (one row per subject). */
export interface CertificateImage {
  id: string;
  subject: SubjectSlug;
  /** Path under /public, or null until the client sends the picture. */
  src: string | null;
}

/** Book delivery terms shown on /kitoblar. */
export interface BookDelivery {
  /** e.g. { uz: "2–4 kun", ... } */
  time: Localized | Placeholder;
  cost: number | Placeholder;
}

export interface BookDemo {
  /** Demo PDF under /public. */
  pdf: string;
  /**
   * Page count. The pages are pre-rendered to /books/demo/<slug>/01.jpg, 02.jpg, ...
   * by scripts/render-book-demos.ps1.
   */
  pages: number;
}

export interface Book {
  slug: string;
  title: string;
  /** Exam the book prepares for; the first line of the giant title ("Milliy sertifikat"). */
  series: Localized;
  /** The big mark on the cover; the second line of the giant title ("A+ 100", "86+"). */
  mark: string;
  author: string;
  /** One line for the grid card. Keep all books about the same length. */
  description: Localized;
  /** Paragraph for the detail page. */
  about: Localized;
  /** What is inside, as printed on the cover. */
  features: Localized<string[]>;
  featured: boolean;
  price: number | Placeholder;
  pages: number | Placeholder;
  cover: string | null;
  /** Sample pages, or null if there is none yet. */
  demo: BookDemo | null;
}

export const COURSE_FORMATS = ["offline", "online"] as const;
export type CourseFormat = (typeof COURSE_FORMATS)[number];

export interface Course {
  slug: string;
  subject: SubjectSlug;
  format: CourseFormat;
  title: Localized;
  description: Localized;
  location: Localized | null;
  schedule: Localized | Placeholder;
  duration: Localized | Placeholder;
  price: number | Placeholder;
  channel: ChannelId;
  /** Groups currently enrolling, as announced on Telegram. */
  cohorts: Localized[];
}

export type FaqScope = "home" | "mock";

export interface FaqItem {
  id: string;
  scope: FaqScope;
  question: Localized;
  answer: Localized;
}

/** Where a video story plays from: an Instagram reel/post link, or a file under /public/videos. */
export type VideoSource = { kind: "instagram"; url: string } | { kind: "file"; src: string };

/** A short video in the home page carousel. */
export interface VideoStory {
  id: string;
  source: VideoSource | Placeholder;
  /** Cover image under /public. Without one a file video shows its first frame. */
  poster: string | null;
}

export interface Teacher {
  id: string;
  name: string | Placeholder;
  subject: SubjectSlug;
  experience: Localized | Placeholder;
  /** One or two sentences shown on the card under the name. */
  bio: Localized | Placeholder;
  photo: string | null;
}

export type AdvantageId =
  | "weekly-mock"
  | "video-solutions"
  | "three-languages"
  | "own-books"
  | "community"
  | "online-offline";

export interface Advantage {
  id: AdvantageId;
  title: Localized;
  text: Localized;
}
