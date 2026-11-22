"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import Image from "next/image";

/** Resting turn, so the spine shows. Shared by the grid, the flight and the detail page. */
export const BOOK_REST = { rotateY: 26, rotateX: 4 } as const;

/**
 * One `sizes` string for every place a cover appears: the grid, the flight overlay and the
 * detail hero then reuse the same downloaded file, so the cover never blanks mid-animation.
 */
const COVER_SIZES = "(min-width: 1024px) 340px, 70vw";

type MotionBits = Pick<HTMLMotionProps<"div">, "style" | "initial" | "animate" | "transition">;

interface Book3DProps extends MotionBits {
  cover: string;
  alt: string;
  /** Thickness in px. */
  depth?: number;
  /** Above-the-fold covers load eagerly. */
  eager?: boolean;
}

/** A real-looking 3D book: front cover, spine, page block and back. Fills its parent box (5:7). */
export function Book3D({ cover, alt, depth = 26, eager, style, ...motionProps }: Book3DProps) {
  const face = "absolute backface-hidden";

  return (
    <motion.div
      {...motionProps}
      style={{ transformStyle: "preserve-3d", ...style }}
      className="relative h-full w-full"
    >
      {/* Front cover */}
      <div
        className={`${face} inset-0 overflow-hidden rounded-l-[2px] rounded-r-[4px] border border-ink/10`}
        style={{ transform: `translateZ(${depth / 2}px)` }}
      >
        <Image
          src={cover}
          alt={alt}
          fill
          sizes={COVER_SIZES}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
        />
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-ink/20" />
        <span aria-hidden="true" className="absolute inset-y-0 left-2 w-px bg-surface/40" />
      </div>

      {/* Spine: a strip of the cover, darkened */}
      <div
        aria-hidden="true"
        className={`${face} top-0 h-full bg-cover bg-left`}
        style={{
          width: depth,
          left: -depth / 2,
          backgroundImage: `url("${cover}")`,
          backgroundSize: "auto 100%",
          transform: "rotateY(-90deg)",
        }}
      >
        <span className="absolute inset-0 bg-ink/35" />
      </div>

      {/* Page block */}
      <div
        aria-hidden="true"
        className={`${face} top-[2px] h-[calc(100%-4px)] border-y border-line bg-paper`}
        style={{ width: depth - 2, right: -(depth - 2) / 2, transform: "rotateY(90deg)" }}
      >
        <span className="absolute inset-y-0 left-1/3 w-px bg-line" />
        <span className="absolute inset-y-0 left-2/3 w-px bg-line" />
      </div>

      {/* Back cover */}
      <div
        aria-hidden="true"
        className={`${face} inset-0 rounded-[3px] bg-ink`}
        style={{ transform: `translateZ(${-depth / 2}px) rotateY(180deg)` }}
      />
    </motion.div>
  );
}
