"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useIntroDone } from "@/components/layout/useIntroDone";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface HeroInProps {
  /** Seconds after the intro splash has cleared. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/**
 * One line of text that rises out of a mask when the page opens (inline, so it is valid inside
 * a heading). The padding keeps accents and descenders (ö, q) clear of the mask.
 */
export function RiseLine({ delay = 0, className, children }: HeroInProps) {
  const reduce = useReducedMotion();
  const ready = useIntroDone();

  return (
    <span className={cn("-my-[0.12em] inline-block overflow-hidden py-[0.12em]", className)}>
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: "110%" }}
        animate={ready ? { y: 0 } : undefined}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** A block that fades up into place right after the heading lines. */
export function FadeUp({ delay = 0, className, children }: HeroInProps) {
  const reduce = useReducedMotion();
  const ready = useIntroDone();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
