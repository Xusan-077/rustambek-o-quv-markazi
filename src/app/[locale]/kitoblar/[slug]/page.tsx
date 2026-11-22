import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { BookAbout } from "@/components/sections/books/BookAbout";
import { BookDemo } from "@/components/sections/books/BookDemo";
import { BookDetailHero } from "@/components/sections/books/BookDetailHero";
import { OrderSteps } from "@/components/sections/books/OrderSteps";
import { routing } from "@/i18n/routing";
import { getBook, getBooks, getChannelMap, getSite } from "@/lib/data";
import { bookMetadata } from "@/lib/metadata";
import { t } from "@/lib/utils";
import { bookFacts, demoPageUrls, publicFileUrl } from "@/lib/view";

const DEMO_ID = "demo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export function generateMetadata({
  params,
}: PageProps<"/[locale]/kitoblar/[slug]">): Promise<Metadata> {
  return bookMetadata(params);
}

export default async function BookPage({ params }: PageProps<"/[locale]/kitoblar/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [book, channelMap, site] = await Promise.all([getBook(slug), getChannelMap(), getSite()]);
  if (!book) notFound();

  const demoPages = demoPageUrls(book);
  const orderUrl = channelMap.books.url;

  return (
    <>
      <BookDetailHero
        slug={book.slug}
        title={book.title}
        series={t(book.series, locale)}
        mark={book.mark}
        description={t(book.description, locale)}
        cover={book.cover}
        {...bookFacts(book, locale)}
        orderUrl={orderUrl}
        demoHref={demoPages.length ? `#${DEMO_ID}` : null}
        demoPageCount={demoPages.length}
      />
      <BookAbout
        title={book.title}
        author={book.author}
        about={t(book.about, locale)}
        features={t(book.features, locale)}
      />
      <BookDemo
        id={DEMO_ID}
        title={book.title}
        pages={demoPages}
        pdf={publicFileUrl(book.demo?.pdf ?? null)}
      />
      <OrderSteps orderUrl={orderUrl} phone={site.phones[0]} />
    </>
  );
}
