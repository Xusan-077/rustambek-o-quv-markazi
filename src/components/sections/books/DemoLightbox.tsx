"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { type KeyboardEvent, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { DemoControls } from "./DemoControls";

interface DemoLightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  active: number;
  total: number;
  onChange: (index: number) => void;
}

/**
 * One demo page full screen for reading (native <dialog>: focus trap, Esc and backdrop for free).
 * The page fills the width and scrolls, so small print stays readable on a phone.
 */
export function DemoLightbox({
  open,
  onClose,
  src,
  alt,
  active,
  total,
  onChange,
}: DemoLightboxProps) {
  const common = useTranslations("common");
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // Every new page starts from its top.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [active]);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") onChange(active - 1);
    else if (event.key === "ArrowRight") onChange(active + 1);
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-label={alt}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/90"
    >
      <div className="flex h-full flex-col">
        <div className="flex justify-end p-3">
          <button
            type="button"
            onClick={onClose}
            aria-label={common("close")}
            className="flex size-12 items-center justify-center rounded-full bg-surface/10 text-surface hover:bg-surface/20"
          >
            <Icon icon={X} size={22} />
          </button>
        </div>
        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3">
          <div className="relative mx-auto aspect-[707/1000] w-full max-w-[900px] bg-surface">
            <Image src={src} alt={alt} fill sizes="(min-width: 960px) 900px, 100vw" />
          </div>
        </div>
        <div className="flex justify-center px-4 py-4">
          <DemoControls active={active} total={total} onChange={onChange} tone="dark" />
        </div>
      </div>
    </dialog>
  );
}
