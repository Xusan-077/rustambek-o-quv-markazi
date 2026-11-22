import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
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
  /** Third-priority links: books, online course, results, Telegram channel. */
  extraItems: (NavItem & { external?: boolean })[];
}

const linkClass =
  "inline-flex min-h-touch items-center text-navy-text underline-offset-4 hover:text-surface hover:underline";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-display text-base font-semibold text-surface">{title}</h2>
      {children}
    </div>
  );
}

export function Footer(props: FooterProps) {
  const ui = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="on-navy mt-section bg-navy text-navy-text lg:mt-section-lg">
      <Container className="grid gap-10 py-section sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo name={props.siteName} homeLabel={nav("homeLink")} onNavy />
          <p className="text-sm">{ui("about")}</p>
          <p className="text-sm">{props.address}</p>
        </div>

        <Column title={ui("contact")}>
          <ul>
            {props.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className={linkClass}>
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
          <p className="mt-2 text-sm">{ui("hours", props.workHours)}</p>
        </Column>

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
      </Container>
      <div className="border-t border-surface/10">
        <Container className="py-6 text-sm">
          {ui("rights", { year, name: props.siteName })}
        </Container>
      </div>
    </footer>
  );
}
