import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

interface PageStubProps {
  title: string;
  /** Optional action so the page is still useful before it is built, e.g. a Telegram link. */
  action?: { href: string; label: ReactNode };
}

export function PageStub({ title, action }: PageStubProps) {
  const ui = useTranslations("stub");

  return (
    <Section labelledBy="page-title" className="min-h-[50vh]">
      <h1 id="page-title" className="text-4xl font-bold md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-muted">{ui("soon")}</p>
      {action ? (
        <Button href={action.href} external size="lg" className="mt-8">
          <Icon icon={Send} size={18} />
          {action.label}
        </Button>
      ) : null}
    </Section>
  );
}
