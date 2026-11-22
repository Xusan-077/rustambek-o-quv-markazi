"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface OpenNowBadgeProps {
  opens: string;
  closes: string;
  openText: string;
  closedText: string;
}

const toMinutes = (time: string) => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/** Current minutes since midnight in Tashkent, whatever the visitor's own time zone. */
function tashkentMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tashkent",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return value("hour") * 60 + value("minute");
}

/** Live "open now / closed" pill. Renders only after mount so server and client markup match. */
export function OpenNowBadge({ opens, closes, openText, closedText }: OpenNowBadgeProps) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const now = tashkentMinutes();
      setOpen(now >= toMinutes(opens) && now < toMinutes(closes));
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [opens, closes]);

  if (open === null) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-sm font-medium",
        open ? "bg-success-soft text-success" : "bg-paper text-muted",
      )}
    >
      <span className="relative flex size-2.5" aria-hidden="true">
        {open ? (
          <span className="absolute inline-flex size-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />
        ) : null}
        <span
          className={cn(
            "relative inline-flex size-2.5 rounded-full",
            open ? "bg-success" : "bg-muted",
          )}
        />
      </span>
      {open ? openText : closedText}
    </span>
  );
}
