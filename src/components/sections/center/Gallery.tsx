import { useLocale, useTranslations } from "next-intl";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { t } from "@/lib/utils";
import type { GalleryPhoto } from "@/types/content";

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const locale = useLocale();
  const ui = useTranslations("center");
  const common = useTranslations("common");

  return (
    <Section labelledBy="gallery-title">
      <SectionHeading id="gallery-title" title={ui("galleryTitle")} lead={ui("galleryLead")} />
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {photos.map((photo) => (
          <li key={photo.id}>
            <PhotoFrame
              src={photo.src}
              alt={t(photo.alt, locale)}
              placeholder="[RASM]"
              pendingLabel={common("photoPending")}
              sizes="(min-width: 1024px) 380px, 50vw"
              className="aspect-[4/3]"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
