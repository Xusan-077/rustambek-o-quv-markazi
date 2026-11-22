"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EnrollModal } from "./EnrollModal";
import { Icon } from "@/components/ui/Icon";
import { usePathname } from "@/i18n/navigation";
import { LangSwitcher } from "./LangSwitcher";
import { NavLinks, type NavItem } from "./NavLinks";

interface MobileMenuProps {
  items: NavItem[];
  cta: NavItem;
  phones: { display: string; tel: string }[];
  labels: {
    open: string;
    close: string;
    closeEnroll: string;
    title: string;
    language: string;
    navigation: string;
  };
}

const DIALOG_ID = "mobile-menu";

/**
 * Side sheet built on a modal <dialog>: the browser traps focus, makes the page
 * inert, closes on Esc and returns focus to the trigger.
 */
export function MobileMenu({ items, cta, phones, labels }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => dialogRef.current?.close();

  // Close after client-side navigation (e.g. switching language inside the sheet).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls={DIALOG_ID}
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        className="grid size-touch place-items-center rounded-btn border border-line bg-surface text-ink lg:hidden"
      >
        <Icon icon={Menu} size={22} />
      </button>

      <dialog
        ref={dialogRef}
        id={DIALOG_ID}
        aria-label={labels.title}
        className="menu-sheet bg-surface text-ink"
        onClose={() => setOpen(false)}
        // A click on the dialog element itself (not its content) lands on the backdrop area.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex h-full flex-col gap-8 overflow-y-auto p-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-semibold">{labels.title}</p>
            <button
              type="button"
              autoFocus
              aria-label={labels.close}
              onClick={close}
              className="grid size-touch place-items-center rounded-btn border border-line"
            >
              <Icon icon={X} size={22} />
            </button>
          </div>

          <nav aria-label={labels.navigation}>
            <NavLinks
              items={items}
              onNavigate={close}
              className="flex flex-col"
              linkClassName="flex min-h-touch items-center border-b border-line py-3 font-display text-xl font-medium"
              activeClassName="text-brand"
            />
          </nav>

          <LangSwitcher label={labels.language} className="self-start" />

          <div className="mt-auto flex flex-col gap-3">
            {phones[0] ? (
              <EnrollModal
                phone={phones[0]}
                label={cta.label}
                closeLabel={labels.closeEnroll}
                size="lg"
              />
            ) : null}
            {phones.map((phone) => (
              <Button
                key={phone.tel}
                href={`tel:${phone.tel}`}
                external
                variant="outline"
                size="lg"
              >
                {phone.display}
              </Button>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
