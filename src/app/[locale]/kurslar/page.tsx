import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CourseCard } from "@/components/shared/CourseCard";
import { SubjectCta } from "@/components/shared/SubjectCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routing } from "@/i18n/routing";
import { getCourses, getSite, getSubjects } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";
import { subjectCtaItems } from "@/lib/view";
import { coursesJsonLd } from "@/lib/seo";

export function generateMetadata({ params }: PageProps<"/[locale]/kurslar">): Promise<Metadata> {
  return pageMetadata(params, "courses", ROUTES.courses);
}

/** The offline courses side by side; each card can be reached by /kurslar#<subject>. */
export default async function CoursesPage({ params }: PageProps<"/[locale]/kurslar">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [site, subjects, courses, ui] = await Promise.all([
    getSite(),
    getSubjects(),
    getCourses(),
    getTranslations({ locale, namespace: "courses" }),
  ]);
  const offline = courses.filter((course) => course.format === "offline");
  const [phone] = site.phones;

  return (
    <>
      <JsonLd data={coursesJsonLd(site, subjects, locale)} />
      <Section labelledBy="courses-title">
        <SectionHeading id="courses-title" as="h1" title={ui("title")} lead={ui("lead")} />
        <ul className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offline.map((course, index) => (
            <Reveal as="li" delay={index * 0.1} key={course.slug}>
              <CourseCard course={course} phone={phone} id={course.subject} />
            </Reveal>
          ))}
        </ul>
      </Section>
      <SubjectCta phone={phone} subjects={subjectCtaItems(subjects, locale)} />
    </>
  );
}
