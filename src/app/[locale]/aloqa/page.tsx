import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ChannelsList } from "@/components/sections/contact/ChannelsList";
import { VisitInfo } from "@/components/shared/VisitInfo";
import { routing } from "@/i18n/routing";
import { getChannels, getSite } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";
import { t } from "@/lib/utils";
import { formatAddress } from "@/lib/view";

export function generateMetadata({ params }: PageProps<"/[locale]/aloqa">): Promise<Metadata> {
  return pageMetadata(params, "contact", ROUTES.contact);
}

/** Contact only: address, map, phones and channels. The "about us" story lives on /markaz. */
export default async function ContactPage({ params }: PageProps<"/[locale]/aloqa">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [site, channels, meta] = await Promise.all([
    getSite(),
    getChannels(),
    getTranslations({ locale, namespace: "meta" }),
  ]);

  return (
    <>
      <VisitInfo
        asPageTitle
        title={meta("contactTitle")}
        address={formatAddress(site, locale)}
        workHours={site.workHours}
        phones={site.phones}
        mapUrl={site.mapUrl}
        mapEmbedUrl={site.mapEmbedUrl}
      />
      <ChannelsList
        channels={channels.map((channel) => ({
          id: channel.id,
          handle: channel.handle,
          url: channel.url,
          purpose: t(channel.purpose, locale),
        }))}
        instagramUrl={site.instagramUrl}
      />
    </>
  );
}
