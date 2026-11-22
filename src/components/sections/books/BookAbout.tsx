import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

interface BookAboutProps {
  title: string;
  author: string;
  about: string;
  features: string[];
}

/** What the book is and what is inside: a paragraph on the left, the cover's list on the right. */
export function BookAbout({ title, author, about, features }: BookAboutProps) {
  const ui = useTranslations("bookDetail");

  return (
    <Section labelledBy="about-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-5">
          <p className="text-sm font-semibold text-brand">( {ui("aboutLabel")} )</p>
          <h2 id="about-title" className="text-3xl leading-tight font-semibold md:text-5xl">
            {title}
          </h2>
          <p className="max-w-2xl text-lg text-muted md:text-xl">{about}</p>
          <p className="text-sm text-muted">
            {ui("authorLabel")}: <span className="font-semibold text-ink">{author}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-card border border-line bg-paper p-6 md:p-8">
          <h3 className="font-display text-xl font-bold">{ui("featuresTitle")}</h3>
          <ul className="mt-5 flex flex-col">
            {features.map((feature, index) => (
              <li
                key={feature}
                className="flex items-start gap-4 border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="font-display text-sm font-bold text-muted tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{feature}</span>
                <Icon icon={Check} size={18} className="mt-0.5 text-success" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
