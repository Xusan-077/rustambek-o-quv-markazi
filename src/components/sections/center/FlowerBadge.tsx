import { cn } from "@/lib/utils";

const LOBES = 8;

/** Outline of a soft eight-lobed flower in a 200x200 box (r = R * (1 + a cos 8θ)). */
const FLOWER = (() => {
  const points: string[] = [];
  for (let step = 0; step < 360; step += 3) {
    const angle = (step * Math.PI) / 180;
    const radius = 84 * (1 + 0.14 * Math.cos(LOBES * angle));
    points.push(
      `${(100 + radius * Math.cos(angle)).toFixed(1)},${(100 + radius * Math.sin(angle)).toFixed(1)}`,
    );
  }
  return `M${points.join("L")}Z`;
})();

/** A yellow flower that turns slowly behind a short, still label (e.g. "Qabul oçiq"). */
export function FlowerBadge({
  label,
  decorative,
  className,
}: {
  label: string;
  /** Hide from screen readers, e.g. inside a heading. */
  decorative?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden={decorative || undefined}
      className={cn("relative grid shrink-0 place-items-center", className)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full motion-safe:animate-[spin_28s_linear_infinite]"
      >
        <path d={FLOWER} className="fill-accent" />
      </svg>
      <span className="relative max-w-[70%] text-center font-display text-[0.17em] leading-[1.05] font-extrabold tracking-normal text-ink">
        {label}
      </span>
    </span>
  );
}
