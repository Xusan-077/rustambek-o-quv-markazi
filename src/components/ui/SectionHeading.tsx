import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Rendered on the right on wide screens, e.g. a "see all" link. */
  action?: ReactNode;
  onNavy?: boolean;
  /** Use "h1" when the section opens a page. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  id,
  title,
  lead,
  action,
  onNavy,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <Heading
          id={id}
          className={cn(
            "leading-tight font-semibold",
            Heading === "h1" ? "text-4xl font-bold md:text-5xl" : "text-3xl md:text-4xl",
          )}
        >
          {title}
        </Heading>
        {lead ? (
          <p className={cn("mt-3 text-lg", onNavy ? "text-navy-text" : "text-muted")}>{lead}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
