/**
 * The only module that reads `src/content`. Every function is async so it can be
 * swapped for a `fetch` to the Django REST API without touching callers.
 */
import { advantages } from "@/content/advantages";
import { bookDelivery, books } from "@/content/books";
import { channels } from "@/content/channels";
import { courses } from "@/content/courses";
import { faq } from "@/content/faq";
import { gradeBands } from "@/content/grades";
import { mocks } from "@/content/mocks";
import {
  certificateHolders,
  certificateImages,
  examAnalysisVideos,
  mockResults,
} from "@/content/results";
import { site } from "@/content/site";
import { subjects } from "@/content/subjects";
import { teachers } from "@/content/teachers";
import type {
  Channel,
  ChannelId,
  CourseFormat,
  FaqScope,
  Grade,
  MockResult,
  Subject,
} from "@/types/content";
import { COURSE_FORMATS, GRADES } from "@/types/content";

export async function getSite() {
  return site;
}

export async function getChannels() {
  return channels;
}

export async function getChannelMap(): Promise<Record<ChannelId, Channel>> {
  return Object.fromEntries(channels.map((c) => [c.id, c])) as Record<ChannelId, Channel>;
}

export interface SubjectSummary extends Subject {
  /** Formats this subject is taught in, derived from the course list. */
  formats: CourseFormat[];
}

export async function getSubjects(): Promise<SubjectSummary[]> {
  return subjects.map((subject) => ({
    ...subject,
    formats: COURSE_FORMATS.filter((format) =>
      courses.some((c) => c.subject === subject.slug && c.format === format),
    ),
  }));
}

export async function getTeachers() {
  return teachers;
}

export async function getAdvantages() {
  return advantages;
}

export async function getMocks() {
  return [...mocks].sort((a, b) => b.number - a.number);
}

/** The nearest mock that is still open or upcoming, or null. */
export async function getNextMock() {
  const upcoming = mocks.filter((m) => m.status !== "finished");
  return upcoming.sort((a, b) => a.number - b.number)[0] ?? null;
}

export interface GradeRow {
  grade: Grade;
  count: number;
  /** Share of all participants, 0..1 */
  share: number;
  /** Bar length relative to the largest group, 0..1 */
  scale: number;
}

export interface ResultSummary extends MockResult {
  total: number;
  rows: GradeRow[];
}

function summarize(result: MockResult): ResultSummary {
  const counts = GRADES.map((grade) => result.distribution[grade]);
  const total = counts.reduce((sum, n) => sum + n, 0);
  const max = Math.max(...counts);
  const rows = GRADES.map((grade) => {
    const count = result.distribution[grade];
    return { grade, count, share: total ? count / total : 0, scale: max ? count / max : 0 };
  });
  return { ...result, total, rows };
}

export async function getResults() {
  return [...mockResults].sort((a, b) => b.mockNumber - a.mockNumber).map(summarize);
}

export async function getLatestResult() {
  return (await getResults())[0] ?? null;
}

export async function getExamAnalysisVideos() {
  return examAnalysisVideos;
}

export async function getCertificateHolders() {
  return certificateHolders;
}

export async function getCertificateImages() {
  return certificateImages;
}

export async function getBooks() {
  return [...books].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getBookDelivery() {
  return bookDelivery;
}

export async function getBook(slug: string) {
  return books.find((book) => book.slug === slug) ?? null;
}

/** Online course first (it gets the featured card), then the offline groups. */
export async function getCourses() {
  return [...courses].sort(
    (a, b) => COURSE_FORMATS.indexOf(b.format) - COURSE_FORMATS.indexOf(a.format),
  );
}

export async function getGradeBands() {
  return gradeBands;
}

export async function getFaq(scope: FaqScope) {
  return faq.filter((item) => item.scope === scope);
}
