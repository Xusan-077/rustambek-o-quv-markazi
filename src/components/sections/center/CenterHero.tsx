import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { formatCompact, formatNumber } from "@/lib/utils";

interface CenterHeroProps {
  photo: string | null;
  subscribers: number;
  subjectCount: number;
  languageCount: number;
}

/** Page opener for /markaz: name, short story, building photo and the key numbers. */
export function CenterHero({ photo, subscribers, subjectCount, languageCount }: CenterHeroProps) {
  const locale = useLocale();
  const ui = useTranslations("center");
  const common = useTranslations("common");

  const stats = [
    { value: formatCompact(subscribers, locale), label: ui("stats.subscribers") },
    { value: formatNumber(subjectCount, locale), label: ui("stats.subjects") },
    { value: ui("stats.weeklyValue"), label: ui("stats.weekly") },
    { value: formatNumber(languageCount, locale), label: ui("stats.languages") },
  ];

  return (
    <section aria-labelledby="center-title" className="border-b border-line bg-surface">
      <Container className="grid gap-10 py-section lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-section-lg">
        <div className="flex flex-col gap-6">
          <h1 id="center-title" className="text-4xl leading-[1.1] font-bold md:text-5xl">
            {ui("title")}
          </h1>
          <p className="max-w-xl text-lg text-muted">{ui("lead")}</p>
          <dl
            aria-label={ui("statsLabel")}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1 bg-paper p-5">
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tabular-nums md:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <PhotoFrame
          src={photo}
          alt={ui("photoAlt")}
          placeholder="[BINO RASMI]"
          pendingLabel={common("photoPending")}
          sizes="(min-width: 1024px) 560px, 100vw"
          priority
          className="aspect-[4/3]"
        />
      </Container>
    </section>
  );
}
