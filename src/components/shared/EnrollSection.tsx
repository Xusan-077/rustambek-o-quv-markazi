import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ANCHORS } from "@/lib/routes";
import type { Phone } from "@/types/content";
import { EnrollForm } from "./EnrollForm";

interface EnrollSectionProps {
  variant: "compact" | "full";
  phone: Phone;
}

/** The main conversion block (#yozilish): one white card with a single row, name, phone, button. */
export function EnrollSection({ variant, phone }: EnrollSectionProps) {
  const ui = useTranslations("enroll");

  return (
    <section
      id={ANCHORS.enroll}
      data-padded
      aria-labelledby="enroll-title"
      className="bg-brand-soft pt-6 pb-10 lg:pt-8 lg:pb-14"
    >
      <Container>
        <div className="flex rounded-card border border-line bg-surface p-6 md:p-10">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <h2 id="enroll-title" className="text-3xl leading-tight font-bold md:text-4xl">
              {ui("title")}
            </h2>
            <EnrollForm variant={variant} phone={phone} labelledBy="enroll-title" />
          </div>
        </div>
      </Container>
    </section>
  );
}
