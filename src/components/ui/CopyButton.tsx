"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

interface CopyButtonProps {
  text: string;
  /** Accessible name, e.g. "Nusxalash: +998 90 123 45 67". */
  label: string;
  copiedLabel: string;
  className?: string;
}

/** Icon button that copies `text` to the clipboard and confirms with a check mark. */
export function CopyButton({ text, label, copiedLabel, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, permissions): the text stays selectable.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={cn(
        "inline-flex size-touch shrink-0 cursor-pointer items-center justify-center rounded-btn border motion-safe:transition-colors",
        copied
          ? "border-success bg-success-soft text-success"
          : "border-line text-muted hover:border-brand hover:text-brand",
        className,
      )}
    >
      <Icon icon={copied ? Check : Copy} size={18} />
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
