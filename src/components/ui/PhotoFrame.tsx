import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

interface PhotoFrameProps {
  src: string | null;
  alt: string;
  /** Shown on the placeholder while there is no photo, e.g. "[BINO RASMI]". */
  placeholder: string;
  /** Screen-reader text for the placeholder. */
  pendingLabel: string;
  sizes: string;
  priority?: boolean;
  onNavy?: boolean;
  className?: string;
}

/** A photo slot ready for next/image; renders a graph-paper placeholder until `src` exists. */
export function PhotoFrame({
  src,
  alt,
  placeholder,
  pendingLabel,
  sizes,
  priority,
  onNavy,
  className,
}: PhotoFrameProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-card", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className={cn(
            "flex size-full flex-col items-center justify-center gap-2 border border-dashed text-sm font-medium",
            onNavy
              ? "border-surface/25 bg-surface/5 bg-grid text-navy-text"
              : "border-line bg-paper bg-grid-light text-muted",
          )}
        >
          <Icon icon={ImageIcon} size={28} />
          <span aria-hidden="true">{placeholder}</span>
          <span className="sr-only">
            {alt}. {pendingLabel}
          </span>
        </div>
      )}
    </div>
  );
}
