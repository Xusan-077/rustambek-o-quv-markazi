/** Geometry for the hero grade chart. All values are % of the plot area (y from the top). */

export type Point = [number, number];

export const HOP_LIFT = 8; // how far a hop rises above the higher of two bar tops

export interface Scale {
  min: number;
  max: number;
  ticks: number[];
}

/** A y-axis in whole 5-point steps with room below the lowest bar and above the top one. */
export function scaleFor(thresholds: number[]): Scale {
  const min = Math.floor(Math.min(...thresholds) / 5) * 5 - 5;
  const max = Math.ceil(Math.max(...thresholds) / 5) * 5 + 5;
  const ticks: number[] = [];
  for (let value = min + 5; value < max; value += 5) ticks.push(value);
  return { min, max, ticks };
}

/** Height of a score on the axis, in %. */
export const heightOf = (score: number, scale: Scale) =>
  ((score - scale.min) / (scale.max - scale.min)) * 100;

/** Control point of the hop between two bar tops: midway, lifted above the higher one. */
export function hopControl([x0, y0]: Point, [x2, y2]: Point): Point {
  return [(x0 + x2) / 2, Math.min(y0, y2) - HOP_LIFT];
}

/** Points along the hop (quadratic Bezier), used as keyframes for the marker. */
export function hopSamples(from: Point, to: Point, count = 12): Point[] {
  const [cx, cy] = hopControl(from, to);
  return Array.from({ length: count + 1 }, (_, i) => {
    const t = i / count;
    const a = (1 - t) * (1 - t);
    const b = 2 * (1 - t) * t;
    const c = t * t;
    return [a * from[0] + b * cx + c * to[0], a * from[1] + b * cy + c * to[1]];
  });
}

/** SVG path of arcs linking every bar top, left to right. */
export function hopPath(tops: Point[]): string {
  return tops
    .map((point, i) => {
      if (i === 0) return `M ${point[0]} ${point[1]}`;
      const [cx, cy] = hopControl(tops[i - 1], point);
      return `Q ${cx} ${cy} ${point[0]} ${point[1]}`;
    })
    .join(" ");
}
