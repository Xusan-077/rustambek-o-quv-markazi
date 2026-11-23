"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Phone as PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type PointerEvent } from "react";
import { EnrollModal } from "@/components/layout/EnrollModal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ANCHORS, coursesHref } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Phone, SubjectSlug } from "@/types/content";

export interface SubjectCtaItem {
  slug: SubjectSlug;
  name: string;
  description: string;
}

interface SubjectCtaProps {
  phone: Phone;
  subjects: SubjectCtaItem[];
}

/**
 * "Which subject do you need?": pick a subject, the card answers and links to that course list.
 * A soft light follows the pointer across the blue card. It is the enrol block of every page
 * (#yozilish), so the header's "Kursga yozilish" link lands here on /kurslar.
 */
export function SubjectCta({ phone, subjects }: SubjectCtaProps) {
  const ui = useTranslations("center");
  const common = useTranslations("common");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(subjects[0]?.slug);
  const current = subjects.find((subject) => subject.slug === active);

  const x = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - 160);
    y.set(event.clientY - rect.top - 160);
  }

  return (
    <Section id={ANCHORS.enroll} tone="surface" labelledBy="center-cta-title">
      <Reveal>
        <div
          onPointerMove={onMove}
          className="relative isolate overflow-hidden rounded-card bg-brand p-6 text-surface md:p-12"
        >
          <motion.span
            aria-hidden="true"
            style={{ x, y }}
            className="pointer-events-none absolute top-0 left-0 -z-10 size-80 rounded-full bg-surface/15 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -bottom-16 -z-10 font-display text-[18rem] leading-none font-extrabold text-surface/10 select-none"
          >
            ?
          </span>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <div className="flex flex-col gap-6">
              <h2 id="center-cta-title" className="text-3xl leading-tight font-bold md:text-5xl">
                {ui("ctaTitle")}
              </h2>
              <div role="group" aria-label={ui("ctaTitle")} className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.slug}
                    type="button"
                    aria-pressed={subject.slug === active}
                    onClick={() => setActive(subject.slug)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setActive(subject.slug);
                    }}
                    className={cn(
                      "min-h-touch cursor-pointer rounded-full border px-5 font-semibold active:scale-95 motion-safe:transition-[background-color,color,scale] motion-safe:duration-200",
                      subject.slug === active
                        ? "border-accent bg-accent text-ink"
                        : "border-surface/40 hover:border-surface hover:bg-surface/10",
                    )}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p aria-live="polite" className="min-h-14 text-lg text-surface/90">
                {current?.description ?? ui("ctaText")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <EnrollModal
                  phone={phone}
                  label={common("enroll")}
                  closeLabel={common("close")}
                  variant="accent"
                  size="lg"
                />
                {current ? (
                  <Button href={coursesHref(current.slug)} variant="outlineOnNavy" size="lg">
                    {common("details")}
                    <span className="sr-only">: {current.name}</span>
                    <Icon icon={ArrowRight} size={18} />
                  </Button>
                ) : null}
                <Button href={`tel:${phone.tel}`} external variant="outlineOnNavy" size="lg">
                  <Icon icon={PhoneIcon} size={18} />
                  {common("call")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
