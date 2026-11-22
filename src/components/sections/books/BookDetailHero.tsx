import { ArrowLeft, BookOpen, FileText, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { BookStage } from "./BookStage";
import { GiantTitle } from "./GiantTitle";

interface BookDetailHeroProps {
  slug: string;
  title: string;
  /** Giant title lines, see GiantTitle. */
  series: string;
  mark: string;
  description: string;
  cover: string | null;
  /** Already formatted, or a placeholder like "[BET]". */
  pages: string;
  price: string;
  orderUrl: string;
  /** In-page anchor of the demo reel, or null if the book has none. */
  demoHref: string | null;
  demoPageCount: number;
}

const chip =
  "inline-flex min-h-touch items-center gap-2 rounded-full bg-surface px-4 text-sm font-medium text-ink";

/**
 * Full-screen intro card: the book's name in giant serif letters, the 3D book flying in on top
 * of it, chips with the facts above and the order bar below.
 */
export function BookDetailHero({
  slug,
  title,
  series,
  mark,
  description,
  cover,
  pages,
  price,
  orderUrl,
  demoHref,
  demoPageCount,
}: BookDetailHeroProps) {
  const ui = useTranslations("bookDetail");
  const books = useTranslations("booksSection");

  return (
    <section
      data-hero
      aria-labelledby="book-title"
      className="px-3 pt-[calc(var(--spacing-header)+12px)] md:px-6"
    >
      <div className="relative mx-auto flex min-h-[calc(100dvh-var(--spacing-header)-24px)] max-w-[1400px] flex-col overflow-hidden rounded-card border border-line bg-brand-soft bg-grid-light p-3 md:p-5">
        <Reveal y={-12} className="relative z-20 flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Link href={ROUTES.books} className={cn(chip, "hover:bg-ink hover:text-surface")}>
              <Icon icon={ArrowLeft} size={16} />
              {ui("back")}
            </Link>
            <span className={cn(chip, "bg-ink text-surface")}>{ui("eyebrow")}</span>
          </div>
          <ul className="flex flex-wrap gap-2">
            <li className={chip}>{ui("pagesCount", { pages })}</li>
            <li className={chip}>{ui("priceValue", { price })}</li>
            {demoHref ? (
              <li className={chip}>
                <Icon icon={FileText} size={16} className="text-brand" />
                {ui("demoChip", { count: demoPageCount })}
              </li>
            ) : null}
          </ul>
        </Reveal>

        <div className="relative grid flex-1 place-items-center py-10 [&>*]:[grid-area:1/1]">
          <GiantTitle id="book-title" title={title} series={series} mark={mark} />
          {cover ? (
            <div className="relative z-10">
              <BookStage slug={slug} cover={cover} alt={`${title}, ${books("coverAlt")}`} />
            </div>
          ) : null}
        </div>

        <Reveal
          delay={0.45}
          className="relative z-20 flex flex-col gap-4 rounded-card bg-surface/95 p-4 md:flex-row md:items-center md:justify-between md:rounded-full md:py-3 md:pr-3 md:pl-7"
        >
          <div className="min-w-0">
            <p className="text-sm text-muted">({description})</p>
            <p className="font-display text-xl font-bold">{title}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button href={orderUrl} external size="lg" className="md:rounded-full">
              <Icon icon={Send} size={18} />
              {ui("order")}
            </Button>
            {demoHref ? (
              <Button
                href={demoHref}
                external
                variant="outline"
                size="lg"
                className="md:rounded-full"
              >
                <Icon icon={BookOpen} size={18} />
                {ui("viewDemo")}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
