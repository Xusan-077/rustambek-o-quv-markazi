"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { DemoControls } from "./DemoControls";
import { DemoLightbox } from "./DemoLightbox";
import { DemoSheet } from "./DemoSheet";

/** Pages further than this from the front one are not rendered at all. */
const WINDOW = 3;
const SWIPE_PX = 40;
const INTRO_MS = 1800;

interface DemoReelProps {
  title: string;
  pages: string[];
}

/**
 * The demo pages as a cinematic 3D fan on the navy stage, no PDF viewer around them. They fly
 * out of a stack when the reel scrolls into view; arrows, keys, swipe or the slider page
 * through; the front page opens full screen for reading.
 */
export function DemoReel({ title, pages }: DemoReelProps) {
  const ui = useTranslations("bookDetail");
  const reduce = useReducedMotion() ?? false;
  const stage = useRef<HTMLDivElement>(null);
  const entered = useInView(stage, { once: true, margin: "-20% 0px" });
  const [intro, setIntro] = useState(true);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const swipe = useRef<{ x: number; moved: boolean } | null>(null);

  useEffect(() => {
    if (!entered) return;
    const id = window.setTimeout(() => setIntro(false), INTRO_MS);
    return () => window.clearTimeout(id);
  }, [entered]);

  const last = pages.length - 1;
  const go = (index: number) => setActive(Math.min(Math.max(index, 0), last));
  const pageAlt = (index: number) => ui("pageAlt", { title, page: index + 1 });

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") go(active - 1);
    else if (event.key === "ArrowRight") go(active + 1);
    else return;
    event.preventDefault();
  }

  function onPointerDown(event: PointerEvent) {
    swipe.current = { x: event.clientX, moved: false };
  }

  function onPointerUp(event: PointerEvent) {
    const start = swipe.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) > SWIPE_PX) {
      start.moved = true;
      go(active + (dx < 0 ? 1 : -1));
    }
  }

  function onSelect(index: number) {
    // A swipe ends with a click on whatever page is under the finger: ignore that one.
    if (swipe.current?.moved) {
      swipe.current = null;
      return;
    }
    if (index === active) setZoomed(true);
    else go(index);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={stage}
        role="group"
        aria-roledescription="carousel"
        aria-label={ui("demoTitle")}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="relative w-full touch-pan-y [--page-w:min(72vw,40dvh,420px)] [perspective:2200px]"
        style={{ height: "calc(var(--page-w) * 1.414)" }}
      >
        {/* Soft pool of light on the floor under the front page. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-10 mx-auto h-16 w-[calc(var(--page-w)*1.4)] rounded-[50%] bg-navy/25 blur-2xl"
        />
        {pages.map((src, index) => {
          const offset = index - active;
          if (Math.abs(offset) > WINDOW) return null;
          return (
            <DemoSheet
              key={src}
              src={src}
              alt={pageAlt(index)}
              offset={offset}
              entered={entered || reduce}
              intro={intro && !reduce}
              reduce={reduce}
              label={
                offset === 0
                  ? ui("zoomPage", { page: index + 1 })
                  : ui("goToPage", { page: index + 1 })
              }
              onSelect={() => onSelect(index)}
            />
          );
        })}
      </div>

      <DemoControls active={active} total={pages.length} onChange={go} />

      <DemoLightbox
        open={zoomed}
        onClose={() => setZoomed(false)}
        src={pages[active]}
        alt={pageAlt(active)}
        active={active}
        total={pages.length}
        onChange={go}
      />
    </div>
  );
}
