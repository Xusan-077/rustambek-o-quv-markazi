import { CalendarDays, Clock, MapPin, Wallet } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { EnrollModal } from "@/components/layout/EnrollModal";
import { Icon } from "@/components/ui/Icon";
import { formatPrice, isPlaceholder, t } from "@/lib/utils";
import type { Course, Localized, Phone, Placeholder } from "@/types/content";

interface CourseCardProps {
  course: Course;
  phone: Phone;
  /** Anchor id so links such as /kurslar#matematika land on this card (it gets a ring). */
  id?: string;
}

/**
 * One course as a clear card: a coloured head with the subject, then the facts in labelled
 * rows (where, when, how long, price), open groups, and the enroll button. The head fills
 * blue on hover or focus; a card reached by its #anchor is outlined.
 */
export function CourseCard({ course, phone, id }: CourseCardProps) {
  const locale = useLocale();
  const ui = useTranslations("courses");
  const common = useTranslations("common");
  const text = (value: Localized | Placeholder) =>
    isPlaceholder(value) ? value : t(value, locale);

  const facts = [
    course.location
      ? { icon: MapPin, label: ui("location"), value: t(course.location, locale) }
      : null,
    { icon: CalendarDays, label: ui("schedule"), value: text(course.schedule) },
    { icon: Clock, label: ui("duration"), value: text(course.duration) },
    {
      icon: Wallet,
      label: ui("price"),
      value: isPlaceholder(course.price)
        ? course.price
        : ui("priceValue", { price: formatPrice(course.price, locale) }),
    },
  ].filter((fact) => fact !== null);

  return (
    <article
      id={id}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-card border-2 border-line bg-surface target:border-brand target:ring-4 target:ring-brand/20 focus-within:border-brand hover:border-brand motion-safe:transition-colors motion-safe:duration-300"
    >
      <header className="flex flex-col gap-3 bg-brand-soft p-6 group-focus-within:bg-brand group-hover:bg-brand motion-safe:transition-colors motion-safe:duration-300 md:p-7">
        <h2 className="text-3xl font-bold text-ink group-focus-within:text-surface group-hover:text-surface motion-safe:transition-colors">
          {t(course.title, locale)}
        </h2>
        <p className="text-muted group-focus-within:text-surface/85 group-hover:text-surface/85 motion-safe:transition-colors">
          {t(course.description, locale)}
        </p>
      </header>

      <dl className="flex flex-col divide-y divide-line px-6 md:px-7">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-3 py-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-btn bg-paper text-brand">
              <Icon icon={fact.icon} size={18} />
            </span>
            <div className="flex min-w-0 flex-col">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="font-semibold text-ink">{fact.value}</dd>
            </div>
          </div>
        ))}
      </dl>

      {course.cohorts.length ? (
        <div className="px-6 pt-2 md:px-7">
          <h3 className="mb-2 text-sm text-muted">{ui("cohorts")}</h3>
          <ul className="flex flex-wrap gap-2">
            {course.cohorts.map((cohort) => (
              <li
                key={cohort.uz}
                className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-ink"
              >
                {t(cohort, locale)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <footer className="mt-auto p-6 md:p-7">
        <EnrollModal
          phone={phone}
          label={common("enroll")}
          closeLabel={common("close")}
          size="lg"
          className="w-full"
        />
      </footer>
    </article>
  );
}
