"use client";

import { AnimatePresence, motion, useAnimate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroGradesProps {
  items: { level: string; range: string }[];
  label: string;
  pickLabel: string;
}

const STEP_MS = 900; // time between hops while the marker climbs on its own
const HOLD_STEPS = 3; // extra ticks the marker rests on the top level before starting again
const HOP_LIFT = 10; // how far (in % of the chart height) a hop rises above the higher step
const EASE = [0.22, 1, 0.36, 1] as const;

type Point = [number, number]; // x, y in % of the chart (y from the top)

/** Step height in % of the chart, growing along a curve (slow at first, steeper at the top). */
const heightOf = (index: number, last: number) => 28 + 72 * Math.pow(index / last, 1.5);

/** Control point of the hop between two step tops: midway, lifted above the higher one. */
function hopControl([x0, y0]: Point, [x2, y2]: Point): Point {
  return [(x0 + x2) / 2, Math.min(y0, y2) - HOP_LIFT];
}

/** Points along the hop (quadratic Bezier), used as keyframes for the marker. */
function hopSamples(from: Point, to: Point, count = 12): Point[] {
  const [cx, cy] = hopControl(from, to);
  return Array.from({ length: count + 1 }, (_, i) => {
    const t = i / count;
    const a = (1 - t) * (1 - t);
    const b = 2 * (1 - t) * t;
    const c = t * t;
    return [a * from[0] + b * cx + c * to[0], a * from[1] + b * cy + c * to[1]];
  });
}

/**
 * The national-certificate levels as a bar staircase on graph paper. A dashed path of arcs
 * links the step tops, and a marker hops along it: up out of C, over and down onto C+,
 * up again and onto B, and so on to A+, rests, then starts again (loop).
 * Hovering, focusing or tapping a step pauses the loop; leaving the chart resumes it.
 */
export function HeroGrades({ items, label, pickLabel }: HeroGradesProps) {
  const reduce = useReducedMotion();
  const last = items.length - 1;
  const [tick, setTick] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [marker, animateMarker] = useAnimate<HTMLSpanElement>();

  useEffect(() => {
    if (picked !== null || reduce) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => window.clearInterval(timer);
  }, [picked, reduce]);

  const looped = Math.min(tick % (last + 1 + HOLD_STEPS), last);
  const shown = reduce ? last : (picked ?? looped);

  const centre = (index: number) => ((index + 0.5) / items.length) * 100;
  const top = (index: number): Point => [centre(index), 100 - heightOf(index, last)];
  const path = items
    .map((_, i) => {
      if (i === 0) return `M ${top(0)[0]} ${top(0)[1]}`;
      const [cx, cy] = hopControl(top(i - 1), top(i));
      return `Q ${cx} ${cy} ${top(i)[0]} ${top(i)[1]}`;
    })
    .join(" ");

  // The marker starts on the first shown step; after that it only moves by hopping.
  const [start] = useState(() => top(shown));
  const fromRef = useRef(shown);
  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = shown;
    if (from === shown || !marker.current) return;
    const centreOf = (index: number) => ((index + 0.5) / (last + 1)) * 100;
    const pointOf = (index: number): Point => [centreOf(index), 100 - heightOf(index, last)];
    const element = marker.current;

    // Loop restart (A+ back to C): fade out on top, reappear on the first step, no big flight.
    if (from === last && shown === 0 && !reduce) {
      const [x, y] = pointOf(0);
      void (async () => {
        await animateMarker(element, { opacity: 0, scale: 0.4 }, { duration: 0.3 });
        await animateMarker(element, { left: `${x}%`, bottom: `${100 - y}%` }, { duration: 0 });
        await animateMarker(element, { opacity: 1, scale: 1 }, { duration: 0.3 });
      })();
      return;
    }

    const samples = hopSamples(pointOf(from), pointOf(shown));
    void animateMarker(
      marker.current,
      { left: samples.map(([x]) => `${x}%`), bottom: samples.map(([, y]) => `${100 - y}%`) },
      { duration: reduce ? 0 : 0.7, ease: "easeInOut" },
    );
  }, [shown, last, reduce, marker, animateMarker]);

  function resume() {
    if (picked === null) return;
    setTick(picked);
    setPicked(null);
  }

  const current = items[shown];

  return (
    <div className="flex flex-col gap-12">
      <div aria-live="polite" className="flex min-h-24 items-end gap-5">
        {/* One fixed window: the new level rolls up into it while the old one rolls out the top. */}
        <span className="relative inline-flex h-[1.05em] w-[1.5em] overflow-hidden font-display text-7xl leading-none font-bold text-ink md:text-8xl">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={current?.level}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              className="block"
            >
              {current?.level}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="flex flex-col pb-2">
          <span className="text-sm text-muted">{label}</span>
          <span className="text-lg font-semibold text-ink">{current?.range}</span>
        </span>
      </div>

      <div
        onPointerLeave={resume}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) resume();
        }}
        className="relative h-64 border-b-2 border-ink md:h-80"
      >
        {/* Arcs from one step top to the next: the path the marker hops along */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          // Drawn in by uncovering it left to right, so the dashes never change.
          initial={reduce ? false : { clipPath: "inset(-60% 100% -10% 0%)" }}
          animate={{ clipPath: "inset(-60% 0% -10% 0%)" }}
          transition={{ delay: 0.7, duration: 1.4, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible"
        >
          <path
            d={path}
            fill="none"
            strokeWidth={2.5}
            strokeDasharray="6 6"
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

        <div role="group" aria-label={pickLabel} className="flex h-full items-end gap-2 md:gap-3">
          {items.map((item, index) => (
            <motion.div
              key={item.level}
              initial={reduce ? false : { height: 0 }}
              animate={{ height: `${heightOf(index, last)}%` }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.8, ease: EASE }}
              className="min-w-0 flex-1"
            >
              <button
                type="button"
                aria-pressed={index === shown}
                onPointerEnter={(event) => event.pointerType === "mouse" && setPicked(index)}
                onFocus={() => setPicked(index)}
                onClick={() => setPicked(index)}
                className={cn(
                  "flex size-full items-start justify-center rounded-t-[14px] border-2 border-b-0 pt-5 font-display text-base font-bold motion-safe:transition-colors motion-safe:duration-300 md:text-xl",
                  index === shown && "border-ink bg-navy text-accent",
                  index < shown && "border-brand/40 bg-brand-soft text-brand",
                  index > shown && "border-line bg-surface text-muted hover:border-ink/40",
                )}
              >
                {item.level}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
