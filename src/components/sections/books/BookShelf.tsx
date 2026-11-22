"use client";

import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";
import { BookCover } from "@/components/shared/BookCover";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { setBookLaunch } from "@/lib/book-launch";
import { bookHref } from "@/lib/routes";

export interface ShelfBook {
  slug: string;
  title: string;
  /** "Milliy sertifikat" / "Attestatsiya", shown above the title. */
  series: string;
  description: string;
  cover: string | null;
}

interface BookShelfProps {
  books: ShelfBook[];
  coverAlt: string;
  detailsLabel: string;
}

/**
 * The book grid. Each book is a plain link; on click it records where the book sits, so the
 * detail page can fly the same book in from this exact spot (see BookStage).
 */
export function BookShelf({ books, coverAlt, detailsLabel }: BookShelfProps) {
  function onOpen(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    const box = event.currentTarget.querySelector<HTMLElement>("[data-book-box]");
    if (!box) return;
    const rect = box.getBoundingClientRect();
    setBookLaunch({ slug, left: rect.left, top: rect.top, width: rect.width });
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
      {books.map((book, index) => (
        <Reveal as="li" delay={index * 0.1} key={book.slug} className="h-full">
          <Link
            href={bookHref(book.slug)}
            onClick={(event) => onOpen(event, book.slug)}
            className="group flex h-full flex-col gap-3 rounded-card"
          >
            {book.cover ? (
              <BookCover cover={book.cover} alt={`${book.title}, ${coverAlt}`} />
            ) : null}
            {/* Same rhythm on every card: series, title, a two-line text, the link on one baseline. */}
            <div className="flex flex-1 flex-col items-center text-center">
              <p className="text-xs font-semibold tracking-wider text-brand uppercase">
                {book.series}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">{book.title}</h3>
              <p className="mt-1 line-clamp-3 min-h-[3lh] max-w-[26ch] text-sm text-muted lg:line-clamp-2 lg:min-h-[2lh]">
                {book.description}
              </p>
              <span className="mt-auto inline-flex min-h-touch items-center gap-1.5 pt-1 text-sm font-semibold text-brand">
                {detailsLabel}
                <Icon
                  icon={ArrowRight}
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
