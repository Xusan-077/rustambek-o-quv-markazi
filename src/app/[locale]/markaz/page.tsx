import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { CenterCta } from "@/components/sections/center/CenterCta";
import { CenterHero } from "@/components/sections/center/CenterHero";
import { Gallery } from "@/components/sections/center/Gallery";
import { AdvantagesGrid } from "@/components/shared/AdvantagesGrid";
import { TeachersGrid } from "@/components/shared/TeachersGrid";
import { routing } from "@/i18n/routing";
import { getAdvantages, getMocks, getSite, getSubjects, getTeachers } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";
import { t } from "@/lib/utils";
import { subjectNameMap } from "@/lib/view";

export function generateMetadata({ params }: PageProps<"/[locale]/markaz">): Promise<Metadata> {
  return pageMetadata(params, "center", ROUTES.center);
}

export default async function CenterPage({ params }: PageProps<"/[locale]/markaz">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [site, subjects, teachers, advantages, mocks] = await Promise.all([
    getSite(),
    getSubjects(),
    getTeachers(),
    getAdvantages(),
    getMocks(),
  ]);

  return (
    <>
      <CenterHero
        photo={site.buildingPhoto}
        subscribers={site.telegramSubscribers}
        subjectCount={subjects.length}
        languageCount={mocks[0]?.languages.length ?? 0}
      />
      <TeachersGrid
        teachers={teachers}
        subjectNames={subjectNameMap(subjects, locale)}
        phone={site.phones[0]}
      />
      <AdvantagesGrid advantages={advantages} />
      <Gallery photos={site.gallery} />
      <CenterCta
        phone={site.phones[0]}
        subjects={subjects.map((subject) => ({
          slug: subject.slug,
          name: t(subject.name, locale),
          description: t(subject.description, locale),
        }))}
      />
    </>
  );
}
