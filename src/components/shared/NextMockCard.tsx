import { CalendarDays, Languages, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/lib/routes";
import { formatDate, formatTime } from "@/lib/utils";
import type { Mock } from "@/types/content";

/** White card with the upcoming mock; used inside the navy mock band. */
export function NextMockCard({ mock }: { mock: Pick<Mock, "number" | "startsAt"> }) {
  const locale = useLocale();
  const ui = useTranslations("mockBand");
  const common = useTranslations("common");

  const rows = [
    mock.startsAt
      ? {
          icon: CalendarDays,
          text: ui("when", {
            date: formatDate(mock.startsAt, locale),
            time: formatTime(mock.startsAt, locale),
          }),
        }
      : null,
    { icon: MapPin, text: ui("where") },
    { icon: Languages, text: ui("languages") },
  ].filter((row) => row !== null);

  return (
    <article className="flex flex-col gap-5 rounded-card bg-surface p-6 text-ink shadow-lift sm:p-7">
      <div>
        <p className="text-sm text-muted">{ui("nextTitle")}</p>
        <h3 className="mt-1 text-3xl font-bold">{ui("nextNumber", { number: mock.number })}</h3>
      </div>
      <ul className="flex flex-col gap-3">
        {rows.map((row) => (
          <li key={row.text} className="flex items-start gap-3">
            <Icon icon={row.icon} className="mt-0.5 text-brand" />
            <span>{row.text}</span>
          </li>
        ))}
      </ul>
      <Button href={ROUTES.mock} size="lg" className="w-full">
        {common("registerMockNumber", { number: mock.number })}
      </Button>
    </article>
  );
}
