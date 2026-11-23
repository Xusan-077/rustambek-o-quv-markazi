"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { hopSamples, type Point } from "./gradeChart";

/**
 * Moves the chart marker between bar tops by hopping along the arcs. From the last bar back
 * to the first it fades out and reappears instead of flying across the whole chart.
 * Returns the ref for the marker element and its starting point.
 */
export function useHopMarker(tops: Point[], shown: number, reduce: boolean) {
  const [marker, animateMarker] = useAnimate<HTMLSpanElement>();
  const [start] = useState(() => tops[shown]);
  const fromRef = useRef(shown);
  const last = tops.length - 1;
  // Compared by value: the tops are recomputed on every render.
  const topsKey = JSON.stringify(tops);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = shown;
    if (from === shown || !marker.current) return;
    const points = JSON.parse(topsKey) as Point[];
    const element = marker.current;

    if (from === last && shown === 0 && !reduce) {
      const [x, y] = points[0];
      void (async () => {
        await animateMarker(element, { opacity: 0, scale: 0.4 }, { duration: 0.3 });
        await animateMarker(element, { left: `${x}%`, bottom: `${100 - y}%` }, { duration: 0 });
        await animateMarker(element, { opacity: 1, scale: 1 }, { duration: 0.3 });
      })();
      return;
    }

    const samples = hopSamples(points[from], points[shown]);
    void animateMarker(
      element,
      { left: samples.map(([x]) => `${x}%`), bottom: samples.map(([, y]) => `${100 - y}%`) },
      { duration: reduce ? 0 : 0.7, ease: "easeInOut" },
    );
  }, [shown, last, reduce, marker, animateMarker, topsKey]);

  return { marker, start };
}
