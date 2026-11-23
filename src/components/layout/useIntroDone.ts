"use client";

import { useEffect, useState } from "react";

/** Fired on window by IntroSplash the moment it starts to fade out. */
export const INTRO_DONE_EVENT = "intro:done";

/** True when the intro splash will not be shown, or once it has started to fade away. */
export function introFinished() {
  const { intro, introDone } = document.documentElement.dataset;
  return intro === "seen" || introDone === "true";
}

/**
 * False while the intro splash covers the page, true once it is gone (or was never shown), so
 * entrance animations play where people can see them instead of behind the splash.
 */
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (introFinished()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the DOM after hydration
      setDone(true);
      return;
    }
    const finish = () => setDone(true);
    window.addEventListener(INTRO_DONE_EVENT, finish, { once: true });
    return () => window.removeEventListener(INTRO_DONE_EVENT, finish);
  }, []);

  return done;
}
