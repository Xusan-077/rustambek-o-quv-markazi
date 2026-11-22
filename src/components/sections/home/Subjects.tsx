import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SubjectSummary } from "@/lib/data";
import { coursesHref } from "@/lib/routes";
import { t } from "@/lib/utils";
import { SubjectPanels } from "./SubjectPanels";

export function Subjects({ subjects }: { subjects: SubjectSummary[] }) {
  const locale = useLocale();
  const ui = useTranslations("subjects");
  const common = useTranslations("common");
  const formats = useTranslations("formats");

  return (
    <Section labelledBy="subjects-title">
      <SectionHeading id="subjects-title" title={ui("title")} lead={ui("lead")} />
      <SubjectPanels
        detailsLabel={common("details")}
        primaryBadge={ui("certificateBadge")}
        panels={subjects.map((subject) => ({
          slug: subject.slug,
          href: coursesHref(subject.slug),
          name: t(subject.name, locale),
          description: t(subject.description, locale),
          isPrimary: subject.isPrimary,
          formats: subject.formats.map((format) => ({
            key: format,
            label: formats(format),
            online: format === "online",
          })),
        }))}
      />
    </Section>
  );
}
