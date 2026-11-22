"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const INTRO_STORAGE_KEY = "intro-seen";
const SHOW_MS = 2800; // how long the logo stays before the intro fades away

/**
 * Plain full-screen entrance on white: the logo eases in, the description follows below it,
 * then the whole screen blurs and fades out in place. Scroll stays locked until it is gone. Shown once per browser session, never for
 * reduced-motion users. Click or Esc skips it.
 */
export function IntroSplash({ siteName, description }: { siteName: string; description: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // The layout script already flagged returning visitors and reduced-motion users: CSS hides us.
    if (document.documentElement.dataset.intro === "seen") return;
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // storage blocked: the intro may simply repeat
    }

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setVisible(false), SHOW_MS);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setVisible(false);
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = "")}>
      {visible ? (
        <motion.div
          key="intro"
          role="region"
          aria-label={siteName}
          onClick={() => setVisible(false)}
          exit={{ opacity: 0, filter: "blur(24px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="intro-splash fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-surface px-6 text-center text-ink"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/logo.png"
              alt={siteName}
              width={1000}
              height={259}
              priority
              className="h-auto w-64 md:w-96"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-muted md:text-xl"
          >
            {description}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
