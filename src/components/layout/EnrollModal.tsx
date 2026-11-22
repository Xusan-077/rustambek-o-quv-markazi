"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EnrollForm } from "@/components/shared/EnrollForm";
import { cn } from "@/lib/utils";
import type { Phone } from "@/types/content";

interface EnrollModalProps {
  phone: Phone;
  /** Trigger text, also used as the dialog title. */
  label: string;
  closeLabel: string;
  /** Extra classes for the trigger button. */
  className?: string;
  size?: Parameters<typeof buttonClasses>[1];
  variant?: Parameters<typeof buttonClasses>[0];
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Kursga yoziliş" button that opens the enrollment form in a modal <dialog> (no page jump).
 * The dialog is a transparent full-screen shell: a blurred backdrop fades in behind a panel
 * that rises and scales in. Closing plays the same motion in reverse, then closes the dialog.
 */
export function EnrollModal({
  phone,
  label,
  closeLabel,
  className,
  size = "md",
  variant = "primary",
}: EnrollModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const time = (seconds: number) => ({ duration: reduce ? 0 : seconds, ease: EASE });

  function show() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  return (
    <>
      <button type="button" onClick={show} className={cn(buttonClasses(variant, size), className)}>
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="enroll-modal-title"
        // Esc: play the exit animation first, the dialog closes when it ends.
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-transparent p-0 text-ink backdrop:bg-transparent"
      >
        <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
          {open ? (
            <motion.div
              key="backdrop"
              aria-hidden="true"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={time(0.5)}
              className="absolute inset-0 bg-scrim"
            />
          ) : null}
          {open ? (
            <div
              key="panel-wrap"
              className="absolute inset-0 flex items-center justify-center p-4"
              // A click outside the panel closes the modal.
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={time(0.5)}
                className="flex max-h-[90dvh] w-[min(100%,760px)] flex-col gap-6 overflow-y-auto rounded-card bg-surface p-6 md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2
                    id="enroll-modal-title"
                    className="text-3xl leading-tight font-bold md:text-4xl"
                  >
                    {label}
                  </h2>
                  <button
                    type="button"
                    aria-label={closeLabel}
                    onClick={() => setOpen(false)}
                    className="grid size-touch shrink-0 place-items-center rounded-btn border border-line"
                  >
                    <Icon icon={X} size={22} />
                  </button>
                </div>
                <EnrollForm
                  variant="modal"
                  phone={phone}
                  labelledBy="enroll-modal-title"
                  onSuccess={() => setOpen(false)}
                />
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </dialog>
    </>
  );
}
