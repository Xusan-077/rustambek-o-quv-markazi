import { Phone as PhoneIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { EnrollModal } from "@/components/layout/EnrollModal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { formatCompact } from "@/lib/utils";
import type { GradeBand, Phone } from "@/types/content";
import { HeroCanvas } from "./HeroCanvas";
import { HeroGrades } from "./HeroGrades";

interface HeroProps {
  phone: Phone;
  subscribers: number;
  subjectCount: number;
  grades: GradeBand[];
}

const bold = (chunks: ReactNode) => (
  <b className="font-display text-base font-bold text-ink">{chunks}</b>
);

export function Hero({ phone, subscribers, subjectCount, grades }: HeroProps) {
  const locale = useLocale();
  const ui = useTranslations("hero");
  const common = useTranslations("common");

  const trust = [
    ui.rich("trustSubscribers", { value: formatCompact(subscribers, locale), b: bold }),
    ui.rich("trustSubjects", { count: subjectCount, b: bold }),
  ];

  const items = grades.map((band) => ({
    level: band.level,
    from: band.from,
    short: band.to === undefined ? `${band.from}+` : `${band.from}–${band.to}`,
    range:
      band.to === undefined
        ? ui("gradeTop", { from: band.from })
        : ui("gradeRange", { from: band.from, to: band.to }),
  }));

  return (
    <section aria-labelledby="hero-title" data-hero className="bg-surface text-ink">
      <HeroCanvas>
        <Container className="grid gap-14 pt-[calc(var(--spacing-section)+var(--spacing-header))] pb-section lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-16 lg:pt-[calc(var(--spacing-section-lg)+var(--spacing-header))] lg:pb-section-lg">
          <div className="flex flex-col items-start gap-7">
            <h1
              id="hero-title"
              className="text-[2.75rem] leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              {ui("title")}
            </h1>
            <p className="max-w-xl text-lg text-muted">{ui("lead")}</p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <EnrollModal
                phone={phone}
                label={common("enroll")}
                closeLabel={common("close")}
                variant="primary"
                size="lg"
              />
              <Button href={`tel:${phone.tel}`} external variant="outline" size="lg">
                <Icon icon={PhoneIcon} size={18} />
                {common("call")}
              </Button>
            </div>

            <ul
              aria-label={ui("trustLabel")}
              className="mt-1 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm text-muted"
            >
              {trust.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <HeroGrades
            items={items}
            label={ui("gradeLabel")}
            unit={ui("gradeUnit")}
            pickLabel={ui("gradePick")}
          />
        </Container>
      </HeroCanvas>
    </section>
  );
}
