import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardElement = "div" | "article" | "li";

export function Card({
  as: Tag = "div",
  className,
  children,
}: {
  as?: CardElement;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("rounded-card border border-line bg-surface p-6", className)}>
      {children}
    </Tag>
  );
}
