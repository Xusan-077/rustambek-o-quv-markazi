import { Phone as PhoneIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { EnrollModal } from "@/components/layout/EnrollModal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
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

export function Hero({ phone, subscribers, subjectCount, grades }: HeroProps) {
  const locale = useLocale();
  const ui = useTranslations("hero");
  const common = useTranslations("common");

  const trust = [
    ui("trustSubscribers", { value: formatCompact(subscribers, locale) }),
    ui("trustSubjects", { count: subjectCount }),
  ];

  const items = grades.map((band) => ({
    level: band.level,
    range:
      band.to === undefined
        ? ui("gradeTop", { from: band.from })
        : ui("gradeRange", { from: band.from, to: band.to }),
  }));

  return (
    <section aria-labelledby="hero-title" data-hero className="bg-surface text-ink">
      <HeroCanvas>
        <Container className="grid gap-12 pt-[calc(var(--spacing-section)+var(--spacing-header))] pb-section lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-16 lg:pt-[calc(var(--spacing-section-lg)+var(--spacing-header))] lg:pb-section-lg">
          <div className="flex flex-col items-start gap-7">
            <Reveal delay={0.05} y={32}>
              <h1
                id="hero-title"
                className="text-[2.75rem] leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-7xl"
              >
                {ui.rich("title", {
                  mark: (chunks) => <span className="text-brand">{chunks}</span>,
                })}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="max-w-xl text-lg text-muted">{ui("lead")}</p>
            </Reveal>

            <Reveal delay={0.3} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
            </Reveal>

            <Reveal delay={0.42}>
              <ul
                aria-label={ui("trustLabel")}
                className="mt-2 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-muted"
              >
                {trust.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <HeroGrades items={items} label={ui("gradeLabel")} pickLabel={ui("gradePick")} />
        </Container>
      </HeroCanvas>
    </section>
  );
}
