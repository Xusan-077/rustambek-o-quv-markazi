"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollReadText } from "@/components/ui/ScrollReadText";

interface FounderPinnedProps {
  slogan: string;
  name: string;
  role: string;
  /** The founder photo (rendered on the server, shown on large screens). */
  photo: ReactNode;
}

/**
 * The founder's words as a pinned scene. As the section arrives, a navy panel zooms up to
 * fill the screen; then it stays pinned while scrolling lights the words up one by one,
 * so the text has to be read before the page moves on. The site header slides away
 * while the scene is pinned. Reduced motion: a normal, static section.
 */
export function FounderPinned({ slogan, name, role, photo }: FounderPinnedProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // 0 → 1 while the section travels from the bottom of the screen to the top.
  const { scrollYProgress: entry } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  // 0 → 1 while the section is pinned.
  const { scrollYProgress: pinned } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(entry, [0.35, 1], [0.86, 1]);
  const radius = useTransform(entry, [0.35, 1], [48, 0]);
  const read = useSpring(useTransform(pinned, [0.05, 0.85], [0, 1]), {
    stiffness: 50,
    damping: 20,
    mass: 0.6,
  });

  function syncHeader() {
    const inside = entry.get() >= 0.99 && pinned.get() < 0.97;
    const root = document.documentElement;
    if (inside) root.dataset.hideHeader = "true";
    else delete root.dataset.hideHeader;
  }
  useMotionValueEvent(entry, "change", syncHeader);
  useMotionValueEvent(pinned, "change", syncHeader);
  useEffect(() => () => void delete document.documentElement.dataset.hideHeader, []);

  const quote = (
    <div className="flex flex-col gap-8">
      <span aria-hidden="true" className="font-serif text-8xl leading-none text-accent">
        &ldquo;
      </span>
      <ScrollReadText
        text={slogan}
        progress={reduce ? undefined : read}
        dim={0.2}
        className="-mt-14 font-serif text-[2.25rem] leading-[1.2] font-medium tracking-[-0.01em] sm:text-5xl lg:text-6xl lg:leading-[1.15]"
      />
      <p className="flex flex-col gap-1">
        <span id="founder-name" className="font-display text-2xl font-bold">
          {name}
        </span>
        <span className="text-navy-text">{role}</span>
      </p>
    </div>
  );

  if (reduce) {
    return (
      <section
        aria-labelledby="founder-name"
        className="on-navy bg-navy py-section text-surface lg:py-section-lg"
      >
        <div className="mx-auto grid max-w-page items-center gap-12 px-6 lg:grid-cols-[1fr_minmax(0,380px)]">
          {quote}
          <div className="hidden lg:block">{photo}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="founder-name" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="on-navy flex size-full items-center bg-navy text-surface"
        >
          <div className="mx-auto grid w-full max-w-page items-center gap-12 px-6 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-20">
            {quote}
            <div className="hidden lg:block">{photo}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
