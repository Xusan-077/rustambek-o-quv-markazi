import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { ANCHORS } from "@/lib/routes";
import { t } from "@/lib/utils";
import type { FaqItem } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";

/** Native <details> accordion: keyboard, screen reader and find-in-page support for free. */
export function Faq({ items }: { items: FaqItem[] }) {
  const locale = useLocale();
  const ui = useTranslations("faq");

  return (
    <Section
      id={ANCHORS.faq}
      labelledBy="faq-title"
      className="bg-brand-soft pb-6 lg:pb-8"
      containerClassName="max-w-3xl"
    >
      <Reveal>
        <h2 id="faq-title" className="mb-8 text-3xl leading-tight font-semibold md:text-4xl">
          {ui("title")}
        </h2>
      </Reveal>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index, 6) * 0.05}>
            <details className="faq-item rounded-card border border-line bg-surface px-5 md:px-6">
              <summary className="flex min-h-touch cursor-pointer items-start gap-3 py-5 font-display text-lg font-medium hover:text-brand">
                <Icon icon={ChevronDown} className="faq-chevron mt-1 text-brand" />
                <span>{t(item.question, locale)}</span>
              </summary>
              <p className="pb-5 pl-8 text-muted">{t(item.answer, locale)}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
