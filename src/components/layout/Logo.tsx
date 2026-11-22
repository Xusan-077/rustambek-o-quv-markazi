import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface LogoProps {
  name: string;
  homeLabel: string;
  /** On the navy footer the black wordmark sits on a white tile. */
  onNavy?: boolean;
}

/** Centre logo (cap + figure + wordmark). The link's label carries the name for screen readers. */
export function Logo({ name, homeLabel, onNavy }: LogoProps) {
  return (
    <Link
      href={ROUTES.home}
      className={cn(
        "flex min-h-touch items-center",
        onNavy && "w-fit self-start rounded-btn bg-surface px-3 py-2",
      )}
      aria-label={`${name}, ${homeLabel}`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={1000}
        height={259}
        priority
        className={cn("w-auto", onNavy ? "h-11" : "h-10")}
      />
    </Link>
  );
}
