"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollReadTextProps {
  text: string;
  className?: string;
  /** Drive the reveal from outside (0..1), e.g. a pinned section's scroll progress. */
  progress?: MotionValue<number>;
  /** Opacity of words not read yet. */
  dim?: number;
}

function Word({
  word,
  range,
  progress,
  dim,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

/** Words light up one by one as the block scrolls (or as `progress` goes from 0 to 1). */
export function ScrollReadText({ text, className, progress, dim = 0.18 }: ScrollReadTextProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const own = useSpring(raw, { stiffness: 60, damping: 22, mass: 0.6 });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => {
        const start = (index / words.length) * 0.85;
        const end = Math.min(1, start + 3 / words.length);
        return (
          <span key={`${word}-${index}`} aria-hidden="true">
            <Word word={word} range={[start, end]} progress={progress ?? own} dim={dim} />{" "}
          </span>
        );
      })}
    </p>
  );
}
