"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  as?: "div" | "li";
  /** Seconds; use small steps (0.06-0.12) to stagger siblings. */
  delay?: number;
  /** Start offset in px: y rises up, x slides in from the side. */
  y?: number;
  x?: number;
  className?: string;
  children: ReactNode;
}

/** Fades and slides its content in once when it scrolls into view. No motion if the user opts out. */
export function Reveal({ as = "div", delay = 0, y = 24, x = 0, className, children }: RevealProps) {
  const reduce = useReducedMotion();
  const props = {
    initial: reduce ? false : { opacity: 0, y, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    className,
  };

  return as === "li" ? (
    <motion.li {...props}>{children}</motion.li>
  ) : (
    <motion.div {...props}>{children}</motion.div>
  );
}
