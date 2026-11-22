"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface DemoSheetProps {
  src: string;
  alt: string;
  /** Distance from the active page: 0 is in front, -1 left, 1 right... */
  offset: number;
  /** False until the reel scrolls into view: the pages wait in a stack below. */
  entered: boolean;
  /** True during the opening fan-out: pages leave the stack one after another. */
  intro: boolean;
  reduce: boolean;
  label: string;
  onSelect: () => void;
}

/** Where a page sits in the 3D fan, by its distance from the active one. */
function pose(offset: number) {
  const side = Math.sign(offset);
  const far = Math.abs(offset);
  if (far === 0)
    return { x: "0%", rotateY: 0, z: 0, scale: 1, opacity: 1, filter: "brightness(1)" };
  return {
    x: `${side * (58 + (far - 1) * 24)}%`,
    rotateY: -side * 52,
    z: -140 - far * 120,
    scale: 0.94,
    opacity: far > 2 ? 0 : 1,
    filter: `brightness(${1 - far * 0.12})`,
  };
}

/** One demo page in the reel. A button: the front page zooms, a side page comes to the front. */
export function DemoSheet({
  src,
  alt,
  offset,
  entered,
  intro,
  reduce,
  label,
  onSelect,
}: DemoSheetProps) {
  const far = Math.abs(offset);
  const stacked = { x: "0%", y: "70%", rotateX: 62, rotateY: 0, z: -420, scale: 0.8, opacity: 0 };

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={label}
      tabIndex={far === 0 ? 0 : -1}
      className={cn(
        "absolute inset-x-0 top-0 mx-auto aspect-[707/1000] w-[var(--page-w)] cursor-pointer overflow-hidden rounded-[4px] bg-surface focus-visible:outline-offset-4",
        far === 0 ? "cursor-zoom-in shadow-page" : "",
        far > 2 && "pointer-events-none",
      )}
      style={{ zIndex: 10 - far }}
      initial={reduce ? false : stacked}
      animate={entered ? { ...pose(offset), y: "0%", rotateX: 0 } : stacked}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: intro ? 1.1 : 0.7, ease: EASE, delay: intro ? 0.1 + far * 0.12 : 0 }
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 520px, 80vw"
        className="object-cover select-none"
        draggable={false}
      />
    </motion.button>
  );
}
