import { useLocale, useTranslations } from "next-intl";
import type { GradeRow } from "@/lib/data";
import { cn, formatNumber, formatPercent } from "@/lib/utils";
import type { Grade } from "@/types/content";
import { GrowBar } from "./GrowBar";

const barTone: Record<Grade, string> = {
  "A+": "bg-accent",
  A: "bg-brand",
  "B+": "bg-brand",
  B: "bg-brand/60",
  "C+": "bg-brand/60",
  C: "bg-brand/60",
  none: "bg-muted/35",
};

interface ResultsBarsProps {
  rows: GradeRow[];
  /** Grow the bars once when the chart scrolls into view. */
  animate?: boolean;
  size?: "default" | "compact";
  className?: string;
}

/**
 * Grade distribution as labelled horizontal bars. Every row carries its numbers
 * as text, so the bars themselves are decorative.
 */
export function ResultsBars({
  rows,
  animate = false,
  size = "default",
  className,
}: ResultsBarsProps) {
  const compact = size === "compact";
  const locale = useLocale();
  const ui = useTranslations("grades");

  return (
    <ul className={cn("flex flex-col", compact ? "gap-1.5" : "gap-2.5", className)}>
      {rows.map((row, index) => (
        <li
          key={row.grade}
          className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[6.5rem_1fr_auto]"
        >
          <span
            className={cn(
              "font-display font-semibold",
              row.grade === "none" ? "text-xs text-muted sm:text-sm" : "text-base text-ink",
            )}
          >
            {row.grade === "none" ? ui("none") : row.grade}
          </span>
          <span
            aria-hidden="true"
            className={cn("overflow-hidden rounded-[4px] bg-grid-light", compact ? "h-3.5" : "h-5")}
          >
            <GrowBar
              scale={row.scale}
              index={index}
              animate={animate}
              className={barTone[row.grade]}
            />
          </span>
          <span className="min-w-[6.5rem] text-right tabular-nums">
            <span className="font-semibold text-ink">{formatNumber(row.count, locale)}</span>
            <span className="ml-1.5 text-muted">{formatPercent(row.share, locale)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
