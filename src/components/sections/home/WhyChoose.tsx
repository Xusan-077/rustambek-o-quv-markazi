"use client";

import { Armchair, Gift, HeartHandshake, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhyCard } from "./WhyCard";

type WhyId = "support" | "free" | "coworking";

// Bento layout: the first card is tall on desktop, the other two stack beside it.
const ITEMS: { id: WhyId; icon: LucideIcon; className: string }[] = [
  { id: "support", icon: HeartHandshake, className: "lg:row-span-2" },
  { id: "free", icon: Gift, className: "" },
  { id: "coworking", icon: Armchair, className: "" },
];

// TODO(client): afzalliklar matnini markaz bilan tasdiqlash.
export function WhyChoose() {
  const ui = useTranslations("why");
  const [active, setActive] = useState<WhyId>("support");

  return (
    <Section tone="surface" labelledBy="why-title" className="bg-paper">
      <SectionHeading id="why-title" title={ui("title")} lead={ui("lead")} />
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        {ITEMS.map(({ id, icon, className }, index) => (
          <WhyCard
            key={id}
            index={index}
            icon={icon}
            className={className}
            title={ui(`items.${id}.title`)}
            text={ui(`items.${id}.text`)}
            points={[ui(`items.${id}.p1`), ui(`items.${id}.p2`), ui(`items.${id}.p3`)]}
            active={active === id}
            onActivate={() => setActive(id)}
          />
        ))}
      </div>
    </Section>
  );
}
