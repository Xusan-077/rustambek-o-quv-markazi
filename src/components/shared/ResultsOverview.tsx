import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ResultSummary } from "@/lib/data";
import { ROUTES } from "@/lib/routes";
import { formatNumber } from "@/lib/utils";
import type { CertificateHolder } from "@/types/content";
import { CertificateCard } from "./CertificateCard";
import { ResultsBars } from "./ResultsBars";

interface ResultsOverviewProps {
  result: ResultSummary | null;
  holders: CertificateHolder[];
  tone?: "surface" | "paper";
}

/** Latest mock grades (compact chart) next to certificate holders. */
export function ResultsOverview({ result, holders, tone = "surface" }: ResultsOverviewProps) {
  const locale = useLocale();
  const ui = useTranslations("results");
  const common = useTranslations("common");

  return (
    <Section tone={tone} labelledBy="results-title">
      <SectionHeading
        id="results-title"
        title={ui("title")}
        lead={ui("lead")}
        action={
          <Button href={ROUTES.results} variant="outline">
            {common("allResults")}
          </Button>
        }
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {result ? (
          <figure className="rounded-card border border-line bg-surface p-5 sm:p-6">
            <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-display text-lg font-semibold">
                {ui("chartTitle", { number: result.mockNumber })}
              </span>
              <span className="text-sm text-muted">
                {ui("chartTotal", { total: formatNumber(result.total, locale) })}
              </span>
            </figcaption>
            <ResultsBars rows={result.rows} size="compact" animate />
          </figure>
        ) : null}

        <div>
          <h3 className="mb-4 text-xl font-semibold">{ui("certificatesTitle")}</h3>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {holders.map((holder) => (
              <li key={holder.id}>
                <CertificateCard holder={holder} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
