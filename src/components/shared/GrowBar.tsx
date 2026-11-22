"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GrowBarProps {
  /** 0..1 */
  scale: number;
  index: number;
  animate: boolean;
  className?: string;
}

/** A bar that grows from the left the first time it scrolls into view. Static when motion is reduced. */
export function GrowBar({ scale, index, animate, className }: GrowBarProps) {
  const reduceMotion = useReducedMotion();
  const width = `${Math.max(scale * 100, 1.5)}%`;
  const classes = cn("block h-full origin-left rounded-r-[4px]", className);

  if (!animate || reduceMotion) return <span className={classes} style={{ width }} />;

  return (
    <motion.span
      className={classes}
      style={{ width }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
