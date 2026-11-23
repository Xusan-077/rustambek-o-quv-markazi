import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import type { Phone } from "@/types/content";
import { Logo } from "./Logo";
import { NavLinks, type NavItem } from "./NavLinks";

interface FooterProps {
  siteName: string;
  address: string;
  phones: Phone[];
  workHours: { opens: string; closes: string };
  instagramUrl: string;
  navItems: NavItem[];
  /** Third-priority links: online course, results, Telegram channel. */
  extraItems: (NavItem & { external?: boolean })[];
}

const linkClass =
  "inline-flex min-h-touch items-center text-navy-text hover:text-surface motion-safe:transition-colors";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-1 text-xs font-medium text-navy-text/70">{title}</h2>
      {children}
    </div>
  );
}

/** Quiet navy footer: name and address on the left, three short link columns, one bottom line. */
export function Footer(props: FooterProps) {
  const ui = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="on-navy mt-section bg-navy text-sm text-navy-text lg:mt-section-lg">
      <Container className="flex flex-col gap-10 py-12 lg:flex-row lg:justify-between lg:py-16">
        <div className="flex max-w-xs flex-col gap-4">
          <Logo name={props.siteName} homeLabel={nav("homeLink")} onNavy />
          <p>{ui("about")}</p>
          <p>{props.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:gap-x-16">
          <Column title={ui("pages")}>
            <nav aria-label={ui("pages")}>
              <NavLinks
                items={props.navItems}
                linkClassName={linkClass}
                activeClassName="text-surface"
              />
            </nav>
          </Column>

          <Column title={ui("extra")}>
            <ul>
              {props.extraItems.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      className={linkClass}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Column>

          <Column title={ui("contact")}>
            <ul>
              {props.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className={`${linkClass} tabular-nums`}>
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={props.instagramUrl}
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ui("instagram")}
                </a>
              </li>
            </ul>
            <p className="mt-2">{ui("hours", props.workHours)}</p>
          </Column>
        </div>
      </Container>

      <div className="border-t border-surface/10">
        <Container className="flex items-center justify-between gap-4 py-2">
          <p>{ui("rights", { year, name: props.siteName })}</p>
          <a href="#main" className={`${linkClass} gap-1.5`}>
            {ui("toTop")}
            <Icon icon={ArrowUp} size={14} />
          </a>
        </Container>
      </div>
    </footer>
  );
}
