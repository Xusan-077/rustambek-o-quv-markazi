import { Phone as PhoneIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { EnrollModal } from "@/components/layout/EnrollModal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn, formatCompact, formatNumber } from "@/lib/utils";
import type { Phone } from "@/types/content";
import { CenterBand } from "./CenterBand";
import { FlowerBadge } from "./FlowerBadge";
import { FadeUp, RiseLine } from "./HeroIn";

interface CenterHeroProps {
  photo: string | null;
  phone: Phone;
  subjectNames: string[];
  subscribers: number;
  subjectCount: number;
  languageCount: number;
}

/** Where the building photo is cropped: the sign with the centre's name. */
const PHOTO_FOCUS = "object-center";

/**
 * Page opener for /markaz: the name set huge in two lines, the building photo as a pill beside
 * the first line, a turning "admission open" flower beside the second, then the ways to enrol
 * and a tilted ribbon of what the centre teaches.
 */
export function CenterHero({
  photo,
  phone,
  subjectNames,
  subscribers,
  subjectCount,
  languageCount,
}: CenterHeroProps) {
  const locale = useLocale();
  const ui = useTranslations("center");
  const common = useTranslations("common");

  const stats = [
    { value: formatCompact(subscribers, locale), label: ui("stats.subscribers") },
    { value: formatNumber(subjectCount, locale), label: ui("stats.subjects") },
    { value: formatNumber(languageCount, locale), label: ui("stats.languages") },
  ];

  // Inside the heading the photo is decoration (alt=""), so the heading reads as the name only.
  const pill = (className: string, alt: string) =>
    photo ? (
      <span className={cn("relative overflow-hidden bg-navy", className)}>
        <Image
          src={photo}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 520px, 100vw"
          className={cn("object-cover", PHOTO_FOCUS)}
        />
      </span>
    ) : null;

  return (
    <section aria-labelledby="center-title" className="overflow-hidden bg-surface pb-section">
      <Container className="pt-10 pb-12 md:pt-14 lg:pb-16">
        <h1
          id="center-title"
          className="flex flex-col font-display text-[clamp(3rem,8.5vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-navy"
        >
          <span className="flex items-center gap-[0.3em]">
            <RiseLine>{ui("heroLine1")} </RiseLine>
            {pill(
              "hidden rounded-photo -my-[0.3em] ml-auto aspect-[2/1] max-w-[4.4em] min-w-0 flex-1 sm:block",
              "",
            )}
          </span>
          <span className="flex items-center gap-[0.12em]">
            <RiseLine delay={0.12}>{ui("heroLine2")}</RiseLine>
            <FlowerBadge
              label={ui("admission")}
              decorative
              className="hidden size-[1.25em] sm:grid"
            />
          </span>
        </h1>

        {/* Phones: the photo gets its own row under the name, with the flower on its corner */}
        <div className="relative mt-6 sm:hidden">
          {pill("block aspect-[2/1] w-full rounded-photo-sm", ui("photoAlt"))}
          <FlowerBadge
            label={ui("admission")}
            className="absolute -right-1 -bottom-16 size-24 text-[6.5rem]"
          />
        </div>

        <p className="mt-20 max-w-3xl font-display text-2xl leading-tight font-bold text-brand sm:mt-10 md:mt-8 md:text-4xl">
          <RiseLine delay={0.3}>{ui("heroSub")}</RiseLine>
        </p>

        <FadeUp
          delay={0.45}
          className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
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
          <dl aria-label={ui("statsLabel")} className="flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-ink tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </Container>

      <CenterBand
        items={[...subjectNames, ui("band.certificate"), ui("band.mock"), ui("band.books")]}
      />
    </section>
  );
}
