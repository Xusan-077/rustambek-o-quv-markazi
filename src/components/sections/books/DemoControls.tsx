"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

interface DemoControlsProps {
  active: number;
  total: number;
  onChange: (index: number) => void;
  /** "light" under the reel on the pale stage, "dark" in the full-screen view. */
  tone?: Tone;
}

const tones: Record<Tone, { button: string; current: string; total: string; hint: string }> = {
  light: {
    button: "border-line bg-surface text-ink hover:border-ink",
    current: "text-brand",
    total: "text-muted",
    hint: "text-muted",
  },
  dark: {
    button: "border-surface/25 text-surface hover:border-surface hover:bg-surface/10",
    current: "text-accent",
    total: "text-navy-text",
    hint: "text-navy-text",
  },
};

/** Previous / next, a page slider and "03 / 25". */
export function DemoControls({ active, total, onChange, tone = "light" }: DemoControlsProps) {
  const ui = useTranslations("bookDetail");
  const colors = tones[tone];
  const pad = (n: number) => String(n).padStart(2, "0");
  const roundButton = cn(
    "flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-30",
    colors.button,
  );

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <div className="flex w-full items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(active - 1)}
          disabled={active === 0}
          aria-label={ui("prevPage")}
          className={roundButton}
        >
          <Icon icon={ChevronLeft} size={22} />
        </button>
        <input
          type="range"
          min={1}
          max={total}
          value={active + 1}
          onChange={(event) => onChange(Number(event.target.value) - 1)}
          aria-label={ui("pageSlider")}
          aria-valuetext={ui("pageOf", { page: active + 1, total })}
          className={cn(
            "h-touch min-w-0 flex-1 cursor-pointer",
            tone === "light" ? "accent-brand" : "accent-accent",
          )}
        />
        <button
          type="button"
          onClick={() => onChange(active + 1)}
          disabled={active === total - 1}
          aria-label={ui("nextPage")}
          className={roundButton}
        >
          <Icon icon={ChevronRight} size={22} />
        </button>
      </div>
      <p aria-live="polite" className="font-display text-sm font-semibold tabular-nums">
        <span className={colors.current}>{pad(active + 1)}</span>
        <span className={colors.total}> / {pad(total)}</span>
      </p>
      {tone === "light" ? <p className={cn("text-xs", colors.hint)}>{ui("hint")}</p> : null}
    </div>
  );
}
