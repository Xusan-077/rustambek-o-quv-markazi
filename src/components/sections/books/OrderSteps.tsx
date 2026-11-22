import { Phone as PhoneIcon, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Phone } from "@/types/content";

const STEPS = ["one", "two", "three"] as const;

interface OrderStepsProps {
  orderUrl: string;
  phone: Phone | undefined;
}

/** "How ordering works": three numbered steps and the two ways to start. */
export function OrderSteps({ orderUrl, phone }: OrderStepsProps) {
  const ui = useTranslations("bookDetail");
  const common = useTranslations("common");

  return (
    <Section labelledBy="steps-title" className="bg-paper" padded>
      <Reveal className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-brand">( {ui("stepsLabel")} )</p>
          <h2 id="steps-title" className="text-3xl leading-tight font-semibold md:text-5xl">
            {ui("stepsTitle")}
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={orderUrl} external size="lg">
            <Icon icon={Send} size={18} />
            {ui("order")}
          </Button>
          {phone ? (
            <Button href={`tel:${phone.tel}`} external variant="outline" size="lg">
              <Icon icon={PhoneIcon} size={18} />
              {common("call")}
            </Button>
          ) : null}
        </div>
      </Reveal>

      <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
        {STEPS.map((step, index) => (
          <Reveal as="li" delay={index * 0.1} key={step} className="h-full">
            <div className="flex h-full flex-col gap-10 rounded-card border border-line bg-surface p-6 md:p-8">
              <span className="font-serif text-6xl leading-none text-brand tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold">{ui(`steps.${step}.title`)}</h3>
                <p className="text-muted">{ui(`steps.${step}.text`)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
