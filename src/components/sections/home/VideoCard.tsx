import { Play } from "lucide-react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

/** What the dialog plays. */
export type VideoPlayer =
  { kind: "file"; src: string } | { kind: "instagram"; url: string; embedUrl: string };

export interface VideoCardData {
  id: string;
  /** Accessible name of the card, e.g. "3-videoni körish". */
  label: string;
  poster: string | null;
  /** null while the video is still a placeholder. */
  player: VideoPlayer | null;
}

interface VideoCardProps {
  video: VideoCardData;
  onPlay: () => void;
  labels: { pending: string; instagram: string };
}

/** A tall 9:16 cover with a play button. */
export function VideoCard({ video, onPlay, labels }: VideoCardProps) {
  const { player, poster } = video;

  if (!player) {
    return (
      <div className="flex aspect-[9/16] w-full items-center justify-center rounded-card border border-dashed border-surface/25 bg-navy bg-grid text-sm font-medium text-navy-text">
        <span aria-hidden="true">[VIDEO]</span>
        <span className="sr-only">{labels.pending}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={video.label}
      className="group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-card bg-navy"
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 42vw, 72vw"
          className="object-cover group-hover:scale-[1.04] motion-safe:transition-transform motion-safe:duration-700"
        />
      ) : player.kind === "file" ? (
        // No cover: the browser shows the first frame of the file.
        <video
          src={`${player.src}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 bg-grid" />
      )}

      {player.kind === "instagram" ? (
        <span className="absolute top-3 left-3 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink">
          {labels.instagram}
        </span>
      ) : null}

      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-full bg-brand text-surface ring-6 ring-surface/25 group-hover:scale-110 group-hover:ring-surface/40 motion-safe:transition-[scale,box-shadow] motion-safe:duration-300"
      >
        <Icon icon={Play} size={24} className="translate-x-0.5 fill-current" />
      </span>
    </button>
  );
}
