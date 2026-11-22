"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Graph-paper background (fine 16px cells, bold 80px cells). Around the mouse a stronger
 * copy of the grid shows through a soft circular mask, like a lamp over the page.
 * Position is written to CSS variables, so moving the mouse never re-renders React.
 */
export function HeroCanvas({ children }: { children: ReactNode }) {
  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget;
    const rect = box.getBoundingClientRect();
    box.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    box.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    box.style.setProperty("--spot-o", "1");
  }

  function onLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--spot-o", "0");
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="bg-graph pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-graph-strong hero-spot pointer-events-none absolute inset-0 -z-10"
      />
      {children}
    </div>
  );
}
