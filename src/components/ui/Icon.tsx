import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Decorative icon. Give the surrounding control its own accessible name. */
export function Icon({
  icon: Glyph,
  size = 20,
  className,
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      strokeWidth={1.75}
      className={cn("shrink-0", className)}
    />
  );
}
