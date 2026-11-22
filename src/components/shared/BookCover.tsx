"use client";

import { useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { Book3D, BOOK_REST } from "./Book3D";

interface BookCoverProps {
  cover: string;
  alt: string;
}

/** The 3D book in the grid: tilts toward the pointer. */
export function BookCover({ cover, alt }: BookCoverProps) {
  const reduce = useReducedMotion();
  const px = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const py = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const lift = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });

  const rotateY = useTransform(px, [-0.5, 0.5], [BOOK_REST.rotateY + 16, BOOK_REST.rotateY - 22]);
  const rotateX = useTransform(py, [-0.5, 0.5], [BOOK_REST.rotateX + 10, BOOK_REST.rotateX - 12]);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
    lift.set(-10);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
    lift.set(0);
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[210px] px-2 py-4 [perspective:1000px]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-6 bottom-1 h-5 rounded-[50%] bg-ink/30 blur-lg"
      />
      {/* Unrotated 5:7 box: the detail page flies its book in from here. */}
      <div data-book-box className="relative aspect-[5/7] w-full">
        <Book3D
          cover={cover}
          alt={alt}
          style={reduce ? BOOK_REST : { rotateY, rotateX, y: lift }}
        />
      </div>
    </div>
  );
}
