import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SubjectSummary } from "@/lib/data";
import { coursesHref } from "@/lib/routes";
import { t } from "@/lib/utils";
import { SubjectCard } from "./SubjectCard";

export function Subjects({ subjects }: { subjects: SubjectSummary[] }) {
  const locale = useLocale();
  const ui = useTranslations("subjects");
  const common = useTranslations("common");

  return (
    <Section labelledBy="subjects-title">
      <SectionHeading id="subjects-title" title={ui("title")} lead={ui("lead")} />
      <ul className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.slug}
            id={`subject-${subject.slug}`}
            name={t(subject.name, locale)}
            href={coursesHref(subject.slug)}
            primary={subject.isPrimary}
            badge={subject.isPrimary ? ui("certificateBadge") : null}
            facts={[
              { value: ui("months", { count: subject.plan.months }), label: ui("monthsLabel") },
              {
                value: ui("perWeek", { count: subject.plan.lessonsPerWeek }),
                label: ui("perWeekLabel"),
              },
              {
                value: ui("minutes", { count: subject.plan.lessonMinutes }),
                label: ui("minutesLabel"),
              },
            ]}
            featuresLabel={ui("featuresLabel")}
            features={t(subject.features, locale)}
            detailsLabel={common("details")}
          />
        ))}
      </ul>
    </Section>
  );
}
