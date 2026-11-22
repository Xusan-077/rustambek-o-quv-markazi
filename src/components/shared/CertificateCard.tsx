import { UserRound } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { CertificateHolder } from "@/types/content";

export function CertificateCard({ holder }: { holder: CertificateHolder }) {
  const ui = useTranslations("results");
  const common = useTranslations("common");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
      <div className="relative grid aspect-square place-items-center bg-paper bg-grid-light text-muted">
        {holder.photo ? (
          <Image
            src={holder.photo}
            alt={holder.name}
            fill
            sizes="(min-width: 1024px) 280px, 50vw"
          />
        ) : (
          <>
            <Icon icon={UserRound} size={40} />
            <span className="sr-only">{common("photoPending")}</span>
          </>
        )}
        <span
          className={cn(
            "absolute top-3 left-3 rounded-[10px] px-2.5 py-1 font-display text-lg font-bold",
            holder.grade === "A+" ? "bg-navy text-accent" : "bg-surface text-ink",
          )}
        >
          <span className="sr-only">{ui("gradeLabel", { grade: "" })}</span>
          {holder.grade}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-lg font-semibold">{holder.name}</h3>
        <p className="text-sm text-muted">{holder.district}</p>
      </div>
    </article>
  );
}
