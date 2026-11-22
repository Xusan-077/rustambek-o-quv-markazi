import type { Viewport } from "next";
import { Inter, Manrope, Onest, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { IntroSplash } from "@/components/layout/IntroSplash";
import { Toaster } from "@/components/ui/Toaster";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { routing } from "@/i18n/routing";
import { getChannelMap, getSite } from "@/lib/data";
import { ENROLL_HREF, NAV_ROUTES, ROUTES } from "@/lib/routes";
import { cn, t } from "@/lib/utils";
import "../globals.css";

const display = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

/** Fallback face: used for any glyph Manrope/Onest lack and while they load. */
const fallback = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1B3A", // token: --color-navy (metadata API needs a literal)
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [site, channel, nav, common, footer] = await Promise.all([
    getSite(),
    getChannelMap(),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "footer" }),
  ]);

  const navItems = NAV_ROUTES.map((key) => ({ href: ROUTES[key], label: nav(key) }));
  const cta = { href: ENROLL_HREF, label: common("enroll") };
  const extraItems = [
    { href: ROUTES.books, label: footer("books") },
    { href: channel.onlineCourse.url, label: footer("onlineCourse"), external: true },
    { href: ROUTES.results, label: footer("results") },
    { href: channel.main.url, label: footer("telegramChannel"), external: true },
  ];

  const siteName = t(site.name, locale);
  const address = [site.address.region, site.address.district]
    .map((part) => t(part, locale))
    .concat(site.address.street)
    .join(", ");
  const [mainPhone] = site.phones;

  return (
    <html
      lang={locale}
      // Lets Next switch smooth scrolling off while it resets scroll on navigation; otherwise
      // its scroll calls animate and the new page can glide away from the top.
      data-scroll-behavior="smooth"
      className={cn(display.variable, sans.variable, serif.variable, fallback.variable)}
      // The intro script below sets data-intro on <html> before React loads.
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col pb-sticky-cta md:pb-0">
        {/* Marks the intro as seen before first paint so a returning visitor never sees it flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="seen"}catch(e){}`,
          }}
        />
        <NextIntlClientProvider>
          <IntroSplash siteName={siteName} description={t(site.slogan, locale)} />
          <SmoothScroll />
          <Toaster />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-btn focus:bg-ink focus:px-4 focus:py-3 focus:text-surface"
          >
            {nav("skipToContent")}
          </a>
          <Header siteName={siteName} navItems={navItems} cta={cta} phones={site.phones} />
          <main
            id="main"
            className="flex-1 [&>section:first-of-type:not([data-hero])]:mt-header [&>section:last-of-type:not(.on-navy):not([data-padded])]:pb-0"
          >
            {children}
          </main>
          <Footer
            siteName={siteName}
            address={address}
            phones={site.phones}
            workHours={site.workHours}
            instagramUrl={site.instagramUrl}
            navItems={navItems}
            extraItems={extraItems}
          />
          {mainPhone ? (
            <MobileStickyCta
              tel={mainPhone.tel}
              callLabel={common("call")}
              phone={mainPhone}
              enrollLabel={common("enroll")}
              closeLabel={common("close")}
            />
          ) : null}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
