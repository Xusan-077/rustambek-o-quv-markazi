"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { Book3D, BOOK_REST } from "@/components/shared/Book3D";
import { takeBookLaunch } from "@/lib/book-launch";

const EASE = [0.22, 1, 0.36, 1] as const;
const FLIGHT_S = 1.1;
/** Where the book settles: turned just enough to show it is a real, thick book. */
const LANDED = { rotateY: -14, rotateX: 6 } as const;

interface BookStageProps {
  slug: string;
  cover: string;
  alt: string;
}

/**
 * The detail page's hero book. Coming from the grid it flies in from the exact spot it was
 * clicked, untilts in 3D and lands in the centre; opened directly it rises in on its own.
 * Then it keeps floating gently.
 */
export function BookStage({ slug, cover, alt }: BookStageProps) {
  const reduce = useReducedMotion();
  const scope = useRef<HTMLDivElement>(null);
  // The entrance runs once per mount. StrictMode re-runs effects, and a second run would measure
  // the already-moved book and fly it from nowhere.
  const started = useRef(false);

  useLayoutEffect(() => {
    const el = scope.current;
    if (!el || started.current) return;
    started.current = true;
    const launch = takeBookLaunch(slug);

    // Read the media query directly: useReducedMotion is null on the first client render.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }

    if (launch) {
      // Page coordinates: the router scrolls to the top on this navigation, maybe after us.
      el.style.transform = "none";
      const rect = el.getBoundingClientRect();
      const x = launch.left - (rect.left + window.scrollX);
      const y = launch.top - (rect.top + window.scrollY);
      const scale = launch.width / rect.width;
      // Start where the grid book was before the first paint, then fly.
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = "1";
      animate(el, { x: [x, 0], y: [y, 0], scale: [scale, 1] }, { duration: FLIGHT_S, ease: EASE });
    } else {
      animate(
        el,
        { opacity: [0, 1], y: [90, 0], scale: [0.86, 1] },
        { duration: FLIGHT_S, ease: EASE, delay: 0.15 },
      );
    }
  }, [slug]);

  return (
    <div className="relative mx-auto w-[clamp(150px,40vw,240px)] [perspective:1400px]">
      {/* Opacity 0 until the effect above has placed the book, so it never flashes in the centre. */}
      <div ref={scope} className="relative opacity-0" style={{ transformOrigin: "0 0" }}>
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: FLIGHT_S }}
          className="relative aspect-[5/7] w-full"
        >
          <Book3D
            cover={cover}
            alt={alt}
            depth={36}
            eager
            initial={reduce ? false : BOOK_REST}
            animate={
              reduce
                ? LANDED
                : {
                    rotateY: [BOOK_REST.rotateY, -32, LANDED.rotateY],
                    rotateX: [BOOK_REST.rotateX, -8, LANDED.rotateX],
                  }
            }
            transition={{ duration: FLIGHT_S + 0.3, ease: EASE, times: [0, 0.55, 1] }}
          />
        </motion.div>
      </div>
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-[12%] -bottom-8 h-6 rounded-[50%] bg-ink/25 blur-xl"
        initial={reduce ? false : { opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: FLIGHT_S, ease: EASE, delay: 0.3 }}
      />
    </div>
  );
}
