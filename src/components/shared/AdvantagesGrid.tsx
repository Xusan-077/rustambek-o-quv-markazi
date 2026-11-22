import {
  ArrowUpRight,
  BookMarked,
  CalendarCheck,
  Languages,
  MonitorPlay,
  School,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { t } from "@/lib/utils";
import type { Advantage, AdvantageId } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: Record<AdvantageId, LucideIcon> = {
  "weekly-mock": CalendarCheck,
  "video-solutions": MonitorPlay,
  "three-languages": Languages,
  "own-books": BookMarked,
  community: Users,
  "online-offline": School,
};

/** Sticky heading on the left, numbered rows on the right that slide and fill on hover. */
export function AdvantagesGrid({
  advantages,
  tone = "surface",
}: {
  advantages: Advantage[];
  tone?: "surface" | "paper";
}) {
  const locale = useLocale();
  const ui = useTranslations("advantages");

  return (
    <Section tone={tone} labelledBy="advantages-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="advantages-title"
            title={ui("title")}
            lead={ui("lead")}
            className="mb-0 md:mb-0"
          />
        </div>
        <ol className="flex flex-col border-t border-line">
          {advantages.map((advantage, index) => (
            <Reveal
              as="li"
              delay={Math.min(index, 5) * 0.06}
              key={advantage.id}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-line px-2 py-6 hover:bg-brand-soft motion-safe:transition-[background-color,padding] motion-safe:duration-300 md:gap-6 md:hover:px-5"
            >
              <span
                aria-hidden="true"
                className="w-8 pt-1 font-display text-lg font-bold text-brand md:w-10 md:text-2xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-3 text-xl font-semibold">
                  <Icon
                    icon={ICONS[advantage.id]}
                    size={22}
                    className="shrink-0 text-muted group-hover:text-brand motion-safe:transition-colors"
                  />
                  {t(advantage.title, locale)}
                </h3>
                <p className="text-muted">{t(advantage.text, locale)}</p>
              </div>
              <Icon
                icon={ArrowUpRight}
                size={22}
                className="mt-1 text-brand opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 motion-safe:transition-[opacity,translate] motion-safe:duration-300"
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
