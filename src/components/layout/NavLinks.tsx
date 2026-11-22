"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
}

interface NavLinksProps {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  onNavigate?: () => void;
}

export function NavLinks({
  items,
  className,
  linkClassName,
  activeClassName,
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(linkClassName, active && activeClassName)}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
