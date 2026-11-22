import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "paper" | "surface" | "navy";

const tones: Record<Tone, string> = {
  paper: "bg-surface text-ink",
  surface: "bg-surface text-ink",
  navy: "on-navy bg-navy bg-grid text-surface",
};

interface SectionProps {
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  /** Full-bleed layer behind the content (decoration, interactive backdrops). */
  background?: ReactNode;
  /**
   * Keep the bottom padding even as the page's last section (the layout strips it by default
   * so content meets the footer).
   */
  padded?: boolean;
  children: ReactNode;
}

export function Section({
  id,
  labelledBy,
  tone = "paper",
  className,
  containerClassName,
  background,
  padded,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-padded={padded ? "" : undefined}
      className={cn(
        "py-section lg:py-section-lg",
        tones[tone],
        background ? "relative isolate" : undefined,
        className,
      )}
    >
      {background}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
