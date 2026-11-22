"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Languages, Plus, Sigma } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface SubjectPanel {
  slug: string;
  href: string;
  name: string;
  description: string;
  isPrimary: boolean;
  formats: { key: string; label: string; online: boolean }[];
}

interface SubjectPanelsProps {
  panels: SubjectPanel[];
  detailsLabel: string;
  primaryBadge: string;
}

/** Big faded symbol drawn behind the open panel. */
const WATERMARKS: Record<string, string> = {
  matematika: "Σ",
  "ingliz-tili": "Aa",
  "rus-tili": "Я",
};

/**
 * Accordion-style panels: the active one grows (sideways on desktop, downwards on mobile)
 * and shows details. Hover (mouse) or tap/click selects; the first panel starts open.
 */
export function SubjectPanels({ panels, detailsLabel, primaryBadge }: SubjectPanelsProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(panels[0]?.slug);

  return (
    <ul className="flex flex-col gap-3 lg:h-[26rem] lg:flex-row lg:gap-4">
      {panels.map((panel, index) => {
        const open = panel.slug === active;
        return (
          <motion.li
            key={panel.slug}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileTap={reduce || open ? undefined : { scale: 0.97 }}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(panel.slug);
            }}
            className={cn(
              "group relative flex min-w-0 flex-col overflow-hidden rounded-card border motion-safe:transition-[flex-grow,background-color,border-color] motion-safe:duration-500 lg:flex-[1_1_0]",
              open
                ? "on-navy border-navy bg-navy text-surface lg:flex-[2.4_1_0]"
                : "cursor-pointer border-line bg-surface hover:border-brand hover:bg-brand-soft",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-4 -bottom-10 font-display text-[16rem] leading-none font-extrabold text-surface/[0.06] select-none motion-safe:transition-[opacity,translate] motion-safe:duration-700 lg:text-[20rem]",
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
            >
              {WATERMARKS[panel.slug] ?? panel.name.charAt(0)}
            </span>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(panel.slug)}
              className="flex min-h-touch w-full cursor-pointer items-center gap-4 p-5 text-left md:p-6 lg:flex-col lg:items-start lg:gap-5"
            >
              <span
                className={cn(
                  "grid size-14 shrink-0 place-items-center rounded-btn motion-safe:transition-colors motion-safe:duration-300",
                  open ? "bg-accent text-ink" : "bg-brand-soft text-brand",
                )}
              >
                <Icon icon={panel.isPrimary ? Sigma : Languages} size={28} />
              </span>
              <span className="font-display text-2xl font-bold md:text-3xl">{panel.name}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "ml-auto grid size-9 shrink-0 place-items-center rounded-full border motion-safe:transition-[rotate,background-color,color,border-color] motion-safe:duration-300 lg:absolute lg:top-5 lg:right-5 lg:ml-0",
                  open
                    ? "rotate-45 border-accent text-accent"
                    : "border-brand/40 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-surface",
                )}
              >
                <Icon icon={Plus} size={18} />
              </span>
            </button>

            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-6 left-6 hidden items-center gap-2 font-semibold text-brand lg:flex",
                open && "lg:hidden",
              )}
            >
              {detailsLabel}
              <Icon
                icon={ArrowRight}
                size={18}
                className="group-hover:translate-x-1.5 motion-safe:transition-transform"
              />
            </span>

            <div
              inert={!open}
              className={cn(
                "grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-500 lg:mt-auto lg:grid-rows-[1fr]",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col items-start gap-4 px-5 pb-6 md:px-6 lg:min-w-80">
                  {panel.isPrimary ? <Badge tone="onNavy">{primaryBadge}</Badge> : null}
                  <p className="text-lg text-navy-text">{panel.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {panel.formats.map((format) => (
                      <li key={format.key}>
                        <Badge tone="onNavy">{format.label}</Badge>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={panel.href}
                    className="group inline-flex min-h-touch items-center gap-2 font-semibold text-accent"
                  >
                    {detailsLabel}
                    <span className="sr-only">: {panel.name}</span>
                    <Icon
                      icon={ArrowRight}
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
