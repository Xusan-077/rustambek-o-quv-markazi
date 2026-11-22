import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  const ui = useTranslations("notFound");

  return (
    <Section labelledBy="not-found-title" className="min-h-[50vh]">
      <p className="font-display text-7xl font-bold text-brand" aria-hidden="true">
        404
      </p>
      <h1 id="not-found-title" className="mt-4 text-4xl font-bold">
        {ui("title")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{ui("text")}</p>
      <Button href={ROUTES.home} size="lg" className="mt-8">
        {ui("home")}
      </Button>
    </Section>
  );
}
