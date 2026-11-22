import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { cn } from "@/lib/utils";
import type { CertificateImage } from "@/types/content";

interface CertificateRowProps {
  images: CertificateImage[];
  alt: string;
  pendingLabel: string;
  openLabel: string;
  /** Called with the picture's index in `images`. */
  onOpen: (index: number) => void;
  /** Run the row right-to-left instead of left-to-right. */
  reverse?: boolean;
  /** Full loop duration, e.g. "60s". */
  duration: string;
}

/**
 * One endless row of small certificate cards (the track holds two identical copies).
 * Clicking a card opens the viewer; hovering pauses the row.
 */
export function CertificateRow({
  images,
  alt,
  pendingLabel,
  openLabel,
  onOpen,
  reverse,
  duration,
}: CertificateRowProps) {
  return (
    <div className="marquee w-full overflow-hidden mask-x-from-96%">
      <div
        className={cn("marquee-track", reverse && "marquee-track-reverse")}
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            // The second copy only fills the loop: hidden from screen readers and Tab,
            // but still clickable, since it is on screen half of the time.
            aria-hidden={copy === 1}
            className="marquee-copy flex shrink-0 gap-3 pt-1 pr-3"
          >
            {images.map((image, index) => {
              const card = (
                <PhotoFrame
                  src={image.src}
                  alt={copy === 1 ? "" : alt}
                  placeholder="[SERTIFIKAT]"
                  pendingLabel={pendingLabel}
                  sizes="(min-width: 640px) 144px, 120px"
                  className="aspect-[4/5] w-full"
                />
              );
              return (
                <li key={`${image.id}-${index}`} className="w-30 shrink-0 sm:w-36">
                  {image.src ? (
                    <button
                      type="button"
                      tabIndex={copy === 1 ? -1 : undefined}
                      aria-label={openLabel}
                      onClick={() => onOpen(index)}
                      className="block w-full cursor-zoom-in rounded-card hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300"
                    >
                      {card}
                    </button>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
