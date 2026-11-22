import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { BooksShowcase } from "@/components/sections/home/BooksShowcase";
import { routing } from "@/i18n/routing";
import { getBooks, getChannelMap } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";
import { shelfBooks } from "@/lib/view";

export function generateMetadata({ params }: PageProps<"/[locale]/kitoblar">): Promise<Metadata> {
  return pageMetadata(params, "books", ROUTES.books);
}

export default async function BooksPage({ params }: PageProps<"/[locale]/kitoblar">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [books, channelMap] = await Promise.all([getBooks(), getChannelMap()]);

  return (
    <BooksShowcase
      headingAs="h1"
      orderUrl={channelMap.books.url}
      books={shelfBooks(books, locale)}
    />
  );
}
