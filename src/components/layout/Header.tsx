import { useTranslations } from "next-intl";
import type { Phone } from "@/types/content";
import { EnrollModal } from "./EnrollModal";
import { LangSwitcher } from "./LangSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, type NavItem } from "./NavLinks";

interface HeaderProps {
  siteName: string;
  navItems: NavItem[];
  cta: NavItem;
  phones: Phone[];
}

export function Header({ siteName, navItems, cta, phones }: HeaderProps) {
  const ui = useTranslations("nav");
  const common = useTranslations("common");
  const [admin] = phones;

  return (
    <header
      data-site-header
      className="pointer-events-none sticky top-0 z-40 -mb-header px-3 pt-3 md:px-6"
    >
      <div className="pointer-events-auto mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-4 rounded-[2rem] border border-line bg-surface px-4 shadow-lift md:rounded-[2.5rem] md:px-6">
        <Logo name={siteName} homeLabel={ui("homeLink")} />

        <nav aria-label={ui("label")} className="hidden lg:block">
          <NavLinks
            items={navItems}
            className="flex items-center gap-1"
            linkClassName="flex min-h-touch items-center rounded-btn px-3 text-sm font-medium text-muted transition-colors hover:text-ink"
            activeClassName="text-ink underline decoration-accent decoration-2 underline-offset-8"
          />
        </nav>

        <div className="flex items-center gap-3">
          {admin ? (
            <a
              href={`tel:${admin.tel}`}
              className="hidden min-h-touch items-center rounded-btn px-2 font-semibold tabular-nums hover:text-brand motion-safe:transition-colors xl:flex"
            >
              {admin.display}
            </a>
          ) : null}
          <LangSwitcher label={ui("language")} className="hidden md:block" />
          {admin ? (
            <EnrollModal
              phone={admin}
              label={cta.label}
              closeLabel={common("close")}
              className="hidden md:inline-flex"
            />
          ) : null}
          <MobileMenu
            items={navItems}
            cta={cta}
            phones={phones}
            labels={{
              open: ui("openMenu"),
              close: ui("closeMenu"),
              closeEnroll: common("close"),
              title: ui("menuTitle"),
              language: ui("language"),
              navigation: ui("label"),
            }}
          />
        </div>
      </div>
    </header>
  );
}
