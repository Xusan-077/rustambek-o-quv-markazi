import { useTranslations } from "next-intl";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { FounderPinned } from "./FounderPinned";

interface FounderStatementProps {
  photo: string | null;
}

// TODO(client): shior matnini asoschi bilan tasdiqlash.
export function FounderStatement({ photo }: FounderStatementProps) {
  const ui = useTranslations("founder");
  const common = useTranslations("common");

  return (
    <FounderPinned
      slogan={ui("slogan")}
      name={ui("name")}
      role={ui("label")}
      photo={
        <PhotoFrame
          src={photo}
          alt={ui("photoAlt")}
          placeholder="[RASM]"
          pendingLabel={common("photoPending")}
          sizes="380px"
          onNavy
          className="aspect-[4/5] max-h-[70dvh] w-full"
        />
      }
    />
  );
}
