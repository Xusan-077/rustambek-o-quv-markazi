"use client";

import { useEffect } from "react";

const EASE = 0.1; // share of the remaining distance covered per frame
const NOTCH = 40; // smaller wheel deltas are trackpads, which already scroll smoothly

/** True if the wheel event happens inside something that scrolls on its own (menus, iframes...). */
function insideScrollable(node: EventTarget | null) {
  for (let el = node as HTMLElement | null; el && el !== document.body; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      return true;
    }
  }
  return false;
}

/**
 * Eases mouse-wheel scrolling (lerp towards a target). Touch, keyboard, anchors and scrollbar
 * drags keep the browser's own behaviour; reduced-motion users get no smoothing at all.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let current = target;
    let frame = 0;

    const max = () => document.documentElement.scrollHeight - window.innerHeight;

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo({ top: current, behavior: "instant" });
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (document.querySelector("dialog[open]") || insideScrollable(event.target)) return;
      if (!frame && event.deltaMode === 0 && Math.abs(event.deltaY) < NOTCH) return;

      event.preventDefault();
      // Inside the pinned founder scene the wheel moves at half speed, so the words get read.
      const slow = document.documentElement.dataset.hideHeader ? 0.5 : 1;
      const delta = (event.deltaMode === 1 ? event.deltaY * 32 : event.deltaY) * slow;
      if (!frame) target = current = window.scrollY;
      target = Math.min(Math.max(target + delta, 0), max());
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Anything else that moves the page (keys, anchors, scrollbar): follow it.
    const onScroll = () => {
      if (!frame) target = current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
