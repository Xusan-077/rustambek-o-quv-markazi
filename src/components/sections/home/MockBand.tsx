import { Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NextMockCard } from "@/components/shared/NextMockCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { formatNumber } from "@/lib/utils";
import type { Channel, Mock } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = ["register", "pay", "solve", "report"] as const;

interface MockBandProps {
  nextMock: Pick<Mock, "number" | "startsAt"> | null;
  format: Pick<Mock, "questionCount" | "durationMinutes" | "price">;
  adminHandle: string;
  mainChannel: Channel;
}

/** Mocks as one strong navy band inside the centre story, not a page of their own. */
export function MockBand({ nextMock, format, adminHandle, mainChannel }: MockBandProps) {
  const locale = useLocale();
  const ui = useTranslations("mockBand");
  const common = useTranslations("common");

  const facts = [
    ui("questions", { count: format.questionCount }),
    ui("minutes", { count: format.durationMinutes }),
    ui("price", { price: formatNumber(format.price, locale) }),
  ];

  return (
    <Section tone="navy" labelledBy="mock-band-title">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
        <Reveal className="flex flex-col gap-8">
          <h2
            id="mock-band-title"
            className="text-3xl leading-tight font-semibold md:text-[2.75rem]"
          >
            {ui("title")}
          </h2>
          <ul aria-label={ui("factsLabel")} className="flex flex-wrap gap-2">
            {facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-surface/20 px-4 py-2 font-display text-lg font-semibold tabular-nums"
              >
                {fact}
              </li>
            ))}
          </ul>
          <div>
            <h3 className="mb-3 text-sm font-medium text-navy-text">{ui("stepsLabel")}</h3>
            <ol className="grid gap-3 sm:grid-cols-2">
              {STEPS.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-accent font-display font-bold text-ink"
                  >
                    {index + 1}
                  </span>
                  <span className="text-navy-text">
                    {ui(`steps.${step}`, { admin: `@${adminHandle}` })}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {nextMock ? (
          <Reveal delay={0.15} x={40} y={0}>
            <NextMockCard mock={nextMock} />
          </Reveal>
        ) : (
          <Reveal
            delay={0.15}
            x={40}
            y={0}
            className="flex flex-col gap-4 rounded-card border border-surface/20 p-6"
          >
            <h3 className="text-2xl font-semibold">{ui("noMockTitle")}</h3>
            <p className="text-navy-text">{ui("noMockText")}</p>
            <Button
              href={mainChannel.url}
              external
              variant="accent"
              size="lg"
              className="self-start"
            >
              <Icon icon={Send} size={18} />
              {common("subscribeChannel")}
            </Button>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
