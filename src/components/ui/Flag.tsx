import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Crescent and a row of stars on the blue stripe (simplified for 24px size). */
function Crescent({ stars }: { stars: number }) {
  return (
    <g>
      <circle cx="4.5" cy="3.1" r="1.9" className="fill-surface" />
      <circle cx="5.2" cy="3.1" r="1.6" className="fill-flag-blue" />
      {Array.from({ length: stars }).map((_, index) => (
        <circle
          key={index}
          cx={8 + (index % 3) * 1.4}
          cy={2 + Math.floor(index / 3) * 1.3}
          r="0.38"
          className="fill-surface"
        />
      ))}
    </g>
  );
}

function Uzbekistan() {
  return (
    <>
      <rect width="30" height="20" className="fill-flag-green" />
      <rect width="30" height="6.5" className="fill-flag-blue" />
      <rect y="6.5" width="30" height="7" className="fill-flag-red" />
      <rect y="7" width="30" height="6" className="fill-surface" />
      <Crescent stars={6} />
    </>
  );
}

/** Blue / ochre / green tricolour with white-and-red edging; ochre = the Karakalpak desert. */
function Karakalpakstan() {
  return (
    <>
      <rect width="30" height="20" className="fill-flag-green" />
      <rect width="30" height="6.2" className="fill-flag-blue" />
      <rect y="6.2" width="30" height="7.6" className="fill-surface" />
      <rect y="6.6" width="30" height="6.8" className="fill-flag-red" />
      <rect y="7.4" width="30" height="5.2" className="fill-flag-ochre" />
      <Crescent stars={5} />
    </>
  );
}

function Russia() {
  return (
    <>
      <rect width="30" height="20" className="fill-surface" />
      <rect y="6.67" width="30" height="6.67" className="fill-flag-ru-blue" />
      <rect y="13.33" width="30" height="6.67" className="fill-flag-ru-red" />
    </>
  );
}

const FLAGS: Record<Locale, () => React.ReactNode> = {
  uz: Uzbekistan,
  kaa: Karakalpakstan,
  ru: Russia,
};

/** Decorative flag for a site language (the language name is always written next to it). */
export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const Drawing = FLAGS[locale];
  return (
    <svg
      viewBox="0 0 30 20"
      aria-hidden="true"
      focusable="false"
      className={cn("h-4 w-6 shrink-0 rounded-[3px] ring-1 ring-ink/15", className)}
    >
      <Drawing />
    </svg>
  );
}
