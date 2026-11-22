"use client";

import { Check, Plus, type LucideIcon } from "lucide-react";
import type { CSSProperties, PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface WhyCardProps {
  index: number;
  icon: LucideIcon;
  title: string;
  text: string;
  points: string[];
  active: boolean;
  onActivate: () => void;
  className?: string;
}

/**
 * Bento card: a navy fill grows out of the pointer position (clip-path circle) when the card
 * becomes active. Mouse hover or tap/keyboard activates; the state is exposed via aria-pressed.
 */
export function WhyCard({
  index,
  icon,
  title,
  text,
  points,
  active,
  onActivate,
  className,
}: WhyCardProps) {
  function setOrigin(event: PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        setOrigin(event);
        onActivate();
      }}
      onClick={onActivate}
      style={{ "--x": "85%", "--y": "15%" } as CSSProperties}
      className={cn(
        "group relative flex min-h-touch cursor-pointer flex-col items-start gap-5 overflow-hidden rounded-card border p-6 text-left motion-safe:transition-colors motion-safe:duration-500 md:p-8",
        active ? "on-navy border-navy text-surface" : "border-line bg-surface text-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-on={active}
        className="absolute inset-0 bg-navy [clip-path:circle(0%_at_var(--x)_var(--y))] data-[on=true]:[clip-path:circle(150%_at_var(--x)_var(--y))] motion-safe:transition-[clip-path] motion-safe:duration-700 motion-safe:ease-out"
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-4 right-5 font-display text-8xl leading-none font-extrabold select-none motion-safe:transition-colors motion-safe:duration-500",
          active ? "text-surface/10" : "text-brand/10",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "relative grid size-14 place-items-center rounded-btn motion-safe:transition-[background-color,color,rotate] motion-safe:duration-500",
          active ? "rotate-6 bg-accent text-ink" : "bg-brand-soft text-brand",
        )}
      >
        <Icon icon={icon} size={28} />
      </span>

      <span className="relative flex flex-col gap-2">
        <span className="font-display text-2xl font-bold md:text-3xl">{title}</span>
        <span className={cn("text-base", active ? "text-navy-text" : "text-muted")}>{text}</span>
      </span>

      <span className="relative mt-auto flex w-full flex-col gap-2.5 pt-2">
        {points.map((point, i) => (
          <span
            key={point}
            style={{ transitionDelay: active ? `${150 + i * 90}ms` : "0ms" }}
            className={cn(
              "flex items-start gap-3 text-sm motion-safe:transition-[opacity,translate] motion-safe:duration-500 md:text-base",
              active ? "translate-x-0 opacity-100" : "translate-x-0 opacity-70",
            )}
          >
            <Icon
              icon={Check}
              size={18}
              className={cn("mt-0.5 shrink-0", active ? "text-accent" : "text-brand")}
            />
            {point}
          </span>
        ))}
      </span>

      <Icon
        icon={Plus}
        size={22}
        className={cn(
          "absolute right-5 bottom-5 motion-safe:transition-transform motion-safe:duration-500",
          active ? "rotate-45 text-accent" : "text-muted",
        )}
      />
    </button>
  );
}
