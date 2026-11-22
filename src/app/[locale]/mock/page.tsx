import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageStub } from "@/components/shared/PageStub";
import { getChannelMap } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";

export function generateMetadata({ params }: PageProps<"/[locale]/mock">): Promise<Metadata> {
  return pageMetadata(params, "mock", ROUTES.mock);
}

// TODO: full page and registration form in the next prompt.
export default async function MockPage() {
  const [ui, stub, channel] = await Promise.all([
    getTranslations("meta"),
    getTranslations("stub"),
    getChannelMap(),
  ]);
  return (
    <PageStub
      title={ui("mockTitle")}
      action={{
        href: channel.admin.url,
        label: stub("mockAction", { admin: `@${channel.admin.handle}` }),
      }}
    />
  );
}
