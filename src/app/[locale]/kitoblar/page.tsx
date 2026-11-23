import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { OrderSteps } from "@/components/sections/books/OrderSteps";
import { BooksShowcase } from "@/components/sections/home/BooksShowcase";
import { SubjectCta } from "@/components/shared/SubjectCta";
import { routing } from "@/i18n/routing";
import { getBooks, getChannelMap, getSite, getSubjects } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";
import { shelfBooks, subjectCtaItems } from "@/lib/view";

export function generateMetadata({ params }: PageProps<"/[locale]/kitoblar">): Promise<Metadata> {
  return pageMetadata(params, "books", ROUTES.books);
}

export default async function BooksPage({ params }: PageProps<"/[locale]/kitoblar">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [books, channelMap, site, subjects] = await Promise.all([
    getBooks(),
    getChannelMap(),
    getSite(),
    getSubjects(),
  ]);

  return (
    <>
      <BooksShowcase
        headingAs="h1"
        orderUrl={channelMap.books.url}
        books={shelfBooks(books, locale)}
      />
      <OrderSteps orderUrl={channelMap.books.url} phone={site.phones[0]} />
      <SubjectCta phone={site.phones[0]} subjects={subjectCtaItems(subjects, locale)} />
    </>
  );
}
