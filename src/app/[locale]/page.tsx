import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CertificateResults } from "@/components/sections/home/CertificateResults";
import { BooksShowcase } from "@/components/sections/home/BooksShowcase";
import { Faq } from "@/components/sections/home/Faq";
import { FounderStatement } from "@/components/sections/home/FounderStatement";
import { Hero } from "@/components/sections/home/Hero";
import { Subjects } from "@/components/sections/home/Subjects";
import { VideoStories } from "@/components/sections/home/VideoStories";
import { WhyChoose } from "@/components/sections/home/WhyChoose";
import { AdvantagesGrid } from "@/components/shared/AdvantagesGrid";
import { SubjectCta } from "@/components/shared/SubjectCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { TeachersGrid } from "@/components/shared/TeachersGrid";
import { VisitInfo } from "@/components/shared/VisitInfo";
import { routing } from "@/i18n/routing";
import {
  getAdvantages,
  getBooks,
  getCertificateImages,
  getChannelMap,
  getChannels,
  getFaq,
  getGradeBands,
  getSite,
  getSubjects,
  getTeachers,
  getVideos,
} from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";
import { t } from "@/lib/utils";
import { educationalOrganizationJsonLd } from "@/lib/seo";
import { formatAddress, shelfBooks, subjectCtaItems, subjectNameMap } from "@/lib/view";

export function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  return pageMetadata(params, "home", ROUTES.home);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [
    site,
    channels,
    channelMap,
    subjects,
    teachers,
    advantages,
    faq,
    grades,
    certificateImages,
    books,
    videos,
    visit,
  ] = await Promise.all([
    getSite(),
    getChannels(),
    getChannelMap(),
    getSubjects(),
    getTeachers(),
    getAdvantages(),
    getFaq("home"),
    getGradeBands(),
    getCertificateImages(),
    getBooks(),
    getVideos(),
    getTranslations({ locale, namespace: "visit" }),
  ]);

  const [phone] = site.phones;

  return (
    <>
      <JsonLd data={educationalOrganizationJsonLd(site, channels, locale)} />
      <Hero
        phone={phone}
        grades={grades}
        subscribers={site.telegramSubscribers}
        subjectCount={subjects.length}
      />
      <FounderStatement photo={site.founderPhoto} />
      <Subjects subjects={subjects} />
      <WhyChoose />
      <AdvantagesGrid advantages={advantages} />
      <CertificateResults
        groups={subjects
          .map((subject) => ({
            slug: subject.slug,
            subjectName: t(subject.name, locale),
            images: certificateImages.filter((image) => image.subject === subject.slug),
          }))
          .filter((group) => group.images.length > 0)}
      />
      <VideoStories videos={videos} />
      <TeachersGrid
        teachers={teachers}
        subjectNames={subjectNameMap(subjects, locale)}
        phone={phone}
        showCenterLink
      />
      <BooksShowcase orderUrl={channelMap.books.url} books={shelfBooks(books, locale)} />
      <VisitInfo
        title={visit("title")}
        address={formatAddress(site, locale)}
        workHours={site.workHours}
        phones={site.phones}
        mapUrl={site.mapUrl}
        mapEmbedUrl={site.mapEmbedUrl}
      />
      <Faq items={faq} />
      <SubjectCta phone={phone} subjects={subjectCtaItems(subjects, locale)} />
    </>
  );
}
