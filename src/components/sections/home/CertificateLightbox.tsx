"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface LightboxItem {
  src: string;
  alt: string;
}

interface CertificateLightboxProps {
  items: LightboxItem[];
  /** Index of the open picture; null keeps the lightbox closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  labels: { close: string; prev: string; next: string };
}

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_PX = 60;

/**
 * Full-screen certificate viewer in a modal <dialog>: blurred backdrop, a large picture,
 * previous/next arrows (also arrow keys and swipe) and a counter. Esc, the close button or
 * a click outside the picture closes it.
 */
export function CertificateLightbox({
  items,
  index,
  onIndexChange,
  onClose,
  labels,
}: CertificateLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const time = (seconds: number) => ({ duration: reduce ? 0 : seconds, ease: EASE });
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  function go(step: number) {
    if (index === null || items.length < 2) return;
    setDirection(step);
    onIndexChange((index + step + items.length) % items.length);
  }

  function onSwipe(_: unknown, info: PanInfo) {
    if (info.offset.x <= -SWIPE_PX) go(1);
    else if (info.offset.x >= SWIPE_PX) go(-1);
  }

  const arrow =
    "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-ink hover:border-ink motion-safe:transition-colors md:size-14";

  return (
    <dialog
      ref={dialogRef}
      aria-label={item?.alt}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-transparent"
    >
      <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
        {open ? (
          <motion.div
            key="backdrop"
            aria-hidden="true"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={time(0.4)}
            className="absolute inset-0 bg-scrim"
          />
        ) : null}
        {open && item ? (
          <motion.div
            key="viewer"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={time(0.4)}
            className="absolute inset-0 flex items-center justify-center px-3 pt-16 pb-16 md:px-24 md:pt-4 md:pb-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 80 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -80 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={time(0.35)}
                drag={items.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={onSwipe}
                className="touch-pan-y"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={1600}
                  sizes="(min-width: 768px) 900px, 96vw"
                  draggable={false}
                  className="h-[calc(100dvh-8rem)] w-auto max-w-full rounded-card object-contain select-none md:h-[calc(100dvh-6rem)]"
                />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label={labels.prev}
                  onClick={() => go(-1)}
                  className={`${arrow} left-3 md:left-6`}
                >
                  <Icon icon={ChevronLeft} size={26} />
                </button>
                <button
                  type="button"
                  aria-label={labels.next}
                  onClick={() => go(1)}
                  className={`${arrow} right-3 md:right-6`}
                >
                  <Icon icon={ChevronRight} size={26} />
                </button>
              </>
            ) : null}

            <p
              aria-live="polite"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-ink tabular-nums"
            >
              {(index ?? 0) + 1} / {items.length}
            </p>
            <button
              type="button"
              autoFocus
              aria-label={labels.close}
              onClick={onClose}
              className="absolute top-3 right-3 grid size-12 place-items-center rounded-full border border-line bg-surface text-ink hover:border-ink motion-safe:transition-colors md:top-6 md:right-6 md:size-14"
            >
              <Icon icon={X} size={24} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}
