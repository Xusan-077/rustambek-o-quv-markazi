"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { VideoCard, type VideoCardData } from "./VideoCard";
import { VideoDialog } from "./VideoDialog";

interface VideoCarouselProps {
  heading: ReactNode;
  videos: VideoCardData[];
  labels: {
    prev: string;
    next: string;
    pending: string;
    instagram: string;
    close: string;
    openInstagram: string;
  };
}

/**
 * A row of tall video cards that scrolls sideways with snap points: swipe on phones, arrows
 * (or trackpad) on desktop. The last card peeks in from the edge so the row reads as scrollable.
 * A card opens the video in a dialog.
 */
export function VideoCarousel({ heading, videos, labels }: VideoCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [playing, setPlaying] = useState<VideoCardData | null>(null);

  function updateEdges() {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth - 2;
    setEdges({ start: track.scrollLeft <= 2, end: track.scrollLeft >= max });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => updateEdges());
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  const arrow =
    "grid size-12 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink hover:border-ink disabled:cursor-default disabled:opacity-40 disabled:hover:border-line motion-safe:transition-[border-color,opacity]";

  return (
    <>
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
        {heading}
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label={labels.prev}
            disabled={edges.start}
            onClick={() => scrollByCard(-1)}
            className={arrow}
          >
            <Icon icon={ArrowLeft} size={20} />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            disabled={edges.end}
            onClick={() => scrollByCard(1)}
            className={arrow}
          >
            <Icon icon={ArrowRight} size={20} />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateEdges}
        // `relative` keeps absolutely positioned bits (sr-only text) inside the scroller,
        // otherwise they widen the page.
        className="relative -mx-6 flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-4 overflow-x-auto px-6 pb-2 [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video) => (
          <li key={video.id} className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[23%]">
            <VideoCard
              video={video}
              onPlay={() => setPlaying(video)}
              labels={{ pending: labels.pending, instagram: labels.instagram }}
            />
          </li>
        ))}
      </ul>

      <VideoDialog
        player={playing?.player ?? null}
        title={playing?.label ?? ""}
        onClose={() => setPlaying(null)}
        labels={{ close: labels.close, openInstagram: labels.openInstagram }}
      />
    </>
  );
}
