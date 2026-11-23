"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import type { VideoPlayer } from "./VideoCard";

interface VideoDialogProps {
  /** The video to play; null keeps the dialog closed. */
  player: VideoPlayer | null;
  title: string;
  onClose: () => void;
  labels: { close: string; openInstagram: string };
}

/** Tall player in a modal <dialog>. Esc, the close button or a click outside closes it. */
export function VideoDialog({ player, title, onClose, labels }: VideoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (player && !dialog.open) dialog.showModal();
    if (!player && dialog.open) dialog.close();
  }, [player]);

  // Height-bound on wide screens, width-bound on narrow ones; always 9:16.
  const frame = "aspect-[9/16] h-[min(92dvh,calc(96vw*16/9))] rounded-card";

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-navy/90"
    >
      {player ? (
        <div className="flex flex-col items-center gap-3">
          {player.kind === "file" ? (
            <video
              src={player.src}
              controls
              autoPlay
              playsInline
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              className={`${frame} bg-ink`}
            />
          ) : (
            <iframe
              src={player.embedUrl}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              className={`${frame} border-0 bg-surface`}
            />
          )}
          {player.kind === "instagram" ? (
            <a
              href={player.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-touch items-center font-semibold text-surface underline underline-offset-4"
            >
              {labels.openInstagram}
            </a>
          ) : null}
        </div>
      ) : null}
      <button
        type="button"
        autoFocus
        aria-label={labels.close}
        onClick={onClose}
        className="fixed top-3 right-3 grid size-12 place-items-center rounded-full border border-line bg-surface text-ink hover:border-ink motion-safe:transition-colors md:top-6 md:right-6"
      >
        <Icon icon={X} size={22} />
      </button>
    </dialog>
  );
}
