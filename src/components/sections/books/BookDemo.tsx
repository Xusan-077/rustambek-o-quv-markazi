import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { DemoReel } from "./DemoReel";

interface BookDemoProps {
  id: string;
  title: string;
  /** Pre-rendered page images; empty if the book has no demo yet. */
  pages: string[];
  /** URL-encoded demo PDF, offered as a download. */
  pdf: string | null;
}

/** The demo on the pale graph-paper stage (same as the hero): heading, 3D page reel, PDF download. */
export function BookDemo({ id, title, pages, pdf }: BookDemoProps) {
  const ui = useTranslations("bookDetail");

  return (
    <Section
      id={id}
      labelledBy="demo-title"
      className="overflow-hidden bg-brand-soft bg-grid-light"
    >
      <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold text-brand">( {ui("demoLabel")} )</p>
          <h2 id="demo-title" className="text-3xl leading-tight font-semibold md:text-5xl">
            {ui("demoTitle")}
          </h2>
          <p className="text-lg text-muted">
            {pages.length ? ui("demoLead", { count: pages.length }) : ui("noDemo")}
          </p>
        </div>
        {pdf ? (
          <Button href={pdf} external variant="outline" download className="self-start bg-surface">
            <Icon icon={Download} size={18} />
            {ui("downloadPdf")}
          </Button>
        ) : null}
      </Reveal>

      {pages.length ? <DemoReel title={title} pages={pages} /> : null}
    </Section>
  );
}
