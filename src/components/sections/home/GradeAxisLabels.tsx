import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GradeAxisLabelsProps {
  items: { level: string; short: string }[];
  shown: number;
  columns: CSSProperties;
}

/** Grade letters and score ranges written under the chart axis, one per bar. */
export function GradeAxisLabels({ items, shown, columns }: GradeAxisLabelsProps) {
  return (
    <div aria-hidden="true" style={columns} className="grid pt-3 text-center">
      {items.map((item, index) => (
        <span key={item.level} className="flex flex-col gap-0.5">
          <span
            className={cn(
              "font-display text-base font-bold motion-safe:transition-colors md:text-xl",
              index === shown ? "text-ink" : "text-muted",
            )}
          >
            {item.level}
          </span>
          <span className="text-xs text-muted tabular-nums">{item.short}</span>
        </span>
      ))}
    </div>
  );
}
