import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CertificateImage } from "@/types/content";
import { CertificateGallery } from "./CertificateGallery";

export interface CertificateGroup {
  slug: string;
  subjectName: string;
  images: CertificateImage[];
}

const DURATIONS = ["70s", "60s", "80s"];

/** White section: centered heading, then one edge-to-edge looping row per subject. */
export function CertificateResults({ groups }: { groups: CertificateGroup[] }) {
  const ui = useTranslations("results");
  const common = useTranslations("common");

  return (
    <section
      aria-labelledby="cert-results-title"
      className="overflow-hidden bg-surface py-section text-ink lg:py-section-lg"
    >
      <Container className="mb-10 text-center md:mb-14">
        <Reveal>
          <h2 id="cert-results-title" className="text-3xl leading-tight font-bold md:text-5xl">
            {ui("certCarouselTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">{ui("certCarouselLead")}</p>
        </Reveal>
      </Container>
      <Reveal delay={0.1} className="flex flex-col gap-6">
        <CertificateGallery
          durations={DURATIONS}
          labels={{
            pending: common("photoPending"),
            close: common("close"),
            prev: ui("certPrev"),
            next: ui("certNext"),
          }}
          rows={groups.map((group) => ({
            slug: group.slug,
            alt: ui("certImageAlt", { subject: group.subjectName }),
            openLabel: ui("certOpen", { subject: group.subjectName }),
            images: group.images,
          }))}
        />
      </Reveal>
    </section>
  );
}
