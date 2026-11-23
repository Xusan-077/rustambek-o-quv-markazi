"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIntroDone } from "@/components/layout/useIntroDone";
import { cn } from "@/lib/utils";
import { GradeAxisLabels } from "./GradeAxisLabels";
import { heightOf, hopPath, scaleFor, type Point } from "./gradeChart";
import { useHopMarker } from "./useHopMarker";

interface HeroGradesProps {
  items: { level: string; from: number; short: string; range: string }[];
  label: string;
  unit: string;
  pickLabel: string;
}

const STEP_MS = 900; // time between hops while the marker climbs on its own
const HOLD_STEPS = 3; // extra ticks the marker rests on the top level before starting again
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The national-certificate levels plotted like a chart in a squared exercise book: a real
 * score axis, each bar standing at the level's minimum score, ranges written under the axis.
 * A marker hops from bar to bar up to A+, rests, then starts again. Hovering, focusing or
 * tapping a bar pauses on it; leaving the chart resumes the climb.
 */
export function HeroGrades({ items, label, unit, pickLabel }: HeroGradesProps) {
  const reduce = useReducedMotion();
  // Bars, line and marker wait until the intro splash has cleared.
  const ready = useIntroDone();
  const last = items.length - 1;
  const scale = scaleFor(items.map((item) => item.from));
  const [tick, setTick] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    if (!ready || picked !== null || reduce) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => window.clearInterval(timer);
  }, [ready, picked, reduce]);

  const looped = Math.min(tick % (last + 1 + HOLD_STEPS), last);
  const shown = reduce ? last : (picked ?? looped);

  // Bars sit in equal grid columns, so a bar's centre is exactly (i + 0.5) / n of the width.
  const tops: Point[] = items.map((item, i) => [
    ((i + 0.5) / items.length) * 100,
    100 - heightOf(item.from, scale),
  ]);

  const { marker, start } = useHopMarker(tops, shown, Boolean(reduce));

  function resume() {
    if (picked === null) return;
    setTick(picked);
    setPicked(null);
  }

  const columns = { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` };

  return (
    <figure className="grid grid-cols-[auto_1fr] gap-x-3">
      <figcaption className="col-span-2 mb-8 text-sm font-semibold text-ink">{label}</figcaption>

      {/* Score axis: unit on top, tick values in the gutter, small ticks on the axis line */}
      <div aria-hidden="true" className="relative h-60 w-6 md:h-80">
        <span className="absolute right-0 bottom-full mb-2 text-xs text-muted">{unit}</span>
        {scale.ticks.map((value) => (
          <span
            key={value}
            style={{ bottom: `${heightOf(value, scale)}%` }}
            className="absolute right-0 translate-y-1/2 text-xs text-muted tabular-nums"
          >
            {value}
          </span>
        ))}
      </div>

      <div
        onPointerLeave={resume}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) resume();
        }}
        className="relative h-60 border-b-2 border-l-2 border-ink md:h-80"
      >
        {scale.ticks.map((value) => (
          <span
            key={value}
            aria-hidden="true"
            style={{ bottom: `${heightOf(value, scale)}%` }}
            className="absolute -left-[6px] h-0.5 w-[6px] translate-y-1/2 bg-ink"
          />
        ))}

        <motion.svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          // Drawn in by uncovering it left to right, so the dashes never change.
          initial={reduce ? false : { clipPath: "inset(-60% 100% -10% 0%)" }}
          animate={ready ? { clipPath: "inset(-60% 0% -10% 0%)" } : undefined}
          transition={{ delay: 0.7, duration: 1.4, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible"
        >
          <path
            d={hopPath(tops)}
            fill="none"
            strokeWidth={2}
            strokeDasharray="5 6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="stroke-brand"
          />
        </motion.svg>

        <span
          ref={marker}
          aria-hidden="true"
          style={{ left: `${start[0]}%`, bottom: `${100 - start[1]}%` }}
          className="absolute z-20 size-4 -translate-x-1/2 translate-y-1/2 rounded-full border-[3px] border-ink bg-accent"
        />

        <div role="group" aria-label={pickLabel} style={columns} className="grid h-full items-end">
          {items.map((item, index) => (
            <motion.div
              key={item.level}
              initial={reduce ? false : { height: 0 }}
              animate={ready ? { height: `${heightOf(item.from, scale)}%` } : undefined}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.8, ease: EASE }}
              className="px-1 md:px-1.5"
            >
              <button
                type="button"
                aria-pressed={index === shown}
                aria-label={`${item.level}: ${item.range}`}
                onPointerEnter={(event) => event.pointerType === "mouse" && setPicked(index)}
                onFocus={() => setPicked(index)}
                onClick={() => setPicked(index)}
                className={cn(
                  "block size-full rounded-t-md border-2 border-b-0 motion-safe:transition-colors motion-safe:duration-300",
                  index === shown && "border-ink bg-navy",
                  index < shown && "bg-hatch border-brand/60 bg-brand-soft",
                  index > shown && "border-ink/25 bg-surface hover:border-ink/50",
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" />
      <GradeAxisLabels items={items} shown={shown} columns={columns} />
    </figure>
  );
}
