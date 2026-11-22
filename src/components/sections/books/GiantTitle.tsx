"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface GiantTitleProps {
  id: string;
  /** Accessible name of the heading: the book's real title. */
  title: string;
  /** The series on top ("Milliy sertifikat"), the cover mark below ("A+ 100"). */
  series: string;
  mark: string;
}

/**
 * The book's series and mark in huge serif letters behind the book. Each line rises out of its
 * own mask, one after the other, and is sized to its own length so it always fits the width:
 * the long series line comes out smaller, the short mark huge.
 */
export function GiantTitle({ id, title, series, mark }: GiantTitleProps) {
  const reduce = useReducedMotion();
  const lines = [series, mark];

  return (
    <h1
      id={id}
      aria-label={title}
      className="pointer-events-none flex flex-col items-center text-center font-serif leading-[0.86] font-normal tracking-[-0.03em] text-brand uppercase select-none"
    >
      {lines.map((line, index) => (
        <span
          key={line}
          aria-hidden="true"
          className="block overflow-hidden pb-[0.08em] whitespace-nowrap"
          style={{ fontSize: `clamp(1.5rem, min(26vw, ${118 / line.length}vw, 30dvh), 18rem)` }}
        >
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.14 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
