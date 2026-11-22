import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "success" | "muted" | "onNavy";

const tones: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand",
  accent: "bg-accent-soft text-ink",
  success: "bg-success-soft text-success",
  muted: "bg-paper text-muted",
  onNavy: "border border-accent/40 bg-accent/10 text-accent",
};

export function Badge({
  tone = "brand",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
