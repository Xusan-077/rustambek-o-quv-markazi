import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { BookShelf, type ShelfBook } from "@/components/sections/books/BookShelf";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface BooksShowcaseProps {
  books: ShelfBook[];
  /** Telegram channel where books are ordered. */
  orderUrl: string;
  /** "h1" on /kitoblar, where the shelf is the page itself. */
  headingAs?: "h1" | "h2";
}

/** Author books as 3D objects: each one tilts toward the pointer and opens its detail page. */
export function BooksShowcase({ books, orderUrl, headingAs = "h2" }: BooksShowcaseProps) {
  const ui = useTranslations("booksSection");

  return (
    <Section tone="surface" labelledBy="books-title" className="bg-paper">
      <SectionHeading
        id="books-title"
        as={headingAs}
        title={ui("title")}
        lead={ui("lead")}
        action={
          <Button href={orderUrl} external size="lg">
            <Icon icon={Send} size={18} />
            {ui("order")}
          </Button>
        }
      />
      <BookShelf books={books} coverAlt={ui("coverAlt")} detailsLabel={ui("details")} />
    </Section>
  );
}
