import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageStub } from "@/components/shared/PageStub";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";

export function generateMetadata({ params }: PageProps<"/[locale]/natijalar">): Promise<Metadata> {
  return pageMetadata(params, "results", ROUTES.results);
}

// TODO: full page in a later prompt.
export default async function ResultsPage() {
  const ui = await getTranslations("meta");
  return <PageStub title={ui("resultsTitle")} />;
}
