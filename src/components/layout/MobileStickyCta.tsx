import { Phone as PhoneIcon } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Phone } from "@/types/content";
import { EnrollModal } from "./EnrollModal";
import { cn } from "@/lib/utils";

interface MobileStickyCtaProps {
  tel: string;
  callLabel: string;
  phone: Phone;
  enrollLabel: string;
  closeLabel: string;
}

/** Bottom bar on phones only. The layout reserves space for it with `pb-sticky-cta`. */
export function MobileStickyCta({
  tel,
  callLabel,
  phone,
  enrollLabel,
  closeLabel,
}: MobileStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-surface/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <a href={`tel:${tel}`} className={cn(buttonClasses("outline", "lg"), "min-w-0 px-3")}>
        <Icon icon={PhoneIcon} size={18} />
        {callLabel}
      </a>
      <EnrollModal
        phone={phone}
        label={enrollLabel}
        closeLabel={closeLabel}
        size="lg"
        className="min-w-0 px-3"
      />
    </div>
  );
}
