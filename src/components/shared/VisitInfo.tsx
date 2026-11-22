import { Clock, MapPin, Navigation, Phone as PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isPlaceholder } from "@/lib/utils";
import type { Phone } from "@/types/content";
import { OpenNowBadge } from "./OpenNowBadge";
import { Reveal } from "@/components/ui/Reveal";

interface VisitInfoProps {
  address: string;
  workHours: { opens: string; closes: string };
  phones: Phone[];
  mapUrl: string;
  mapEmbedUrl: string;
  /** Heading level 1 on the contact page, 2 elsewhere. */
  asPageTitle?: boolean;
  title: string;
}

/** Info row that lifts and tints on hover; `children` is the value, `action` sits on the right. */
function Row({
  icon,
  label,
  children,
  action,
}: {
  icon: typeof MapPin;
  label: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Reveal className="group flex items-start gap-4 rounded-card border border-line bg-surface p-4 hover:-translate-y-0.5 hover:border-brand motion-safe:transition-[border-color,translate] motion-safe:duration-200">
      <span className="grid size-11 shrink-0 place-items-center rounded-btn bg-brand-soft text-brand group-hover:bg-brand group-hover:text-surface motion-safe:transition-colors">
        <Icon icon={icon} size={22} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="flex flex-col gap-1 font-medium">{children}</dd>
      </div>
      {action}
    </Reveal>
  );
}

export function VisitInfo(props: VisitInfoProps) {
  const ui = useTranslations("visit");
  const Heading = props.asPageTitle ? "h1" : "h2";
  const hasMap = !isPlaceholder(props.mapEmbedUrl);
  const copiedLabel = ui("copied");

  return (
    <Section tone="surface" labelledBy="visit-title">
      <SectionHeading id="visit-title" as={Heading} title={props.title} lead={ui("lead")} />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <dl className="flex flex-col gap-3">
            <Row
              icon={MapPin}
              label={ui("addressLabel")}
              action={
                <CopyButton
                  text={props.address}
                  label={ui("copy", { value: props.address })}
                  copiedLabel={copiedLabel}
                />
              }
            >
              {props.address}
            </Row>
            <Row icon={Clock} label={ui("hoursLabel")}>
              <span>{ui("hours", props.workHours)}</span>
              <OpenNowBadge
                opens={props.workHours.opens}
                closes={props.workHours.closes}
                openText={ui("openNow", { closes: props.workHours.closes })}
                closedText={ui("closedNow", { opens: props.workHours.opens })}
              />
            </Row>
            {props.phones.map((phone) => (
              <Row
                key={phone.tel}
                icon={PhoneIcon}
                label={ui("phonesLabel")}
                action={
                  <CopyButton
                    text={phone.display}
                    label={ui("copy", { value: phone.display })}
                    copiedLabel={copiedLabel}
                  />
                }
              >
                <a
                  href={`tel:${phone.tel}`}
                  className="inline-flex min-h-touch items-center text-brand underline-offset-4 hover:underline"
                >
                  {phone.display}
                </a>
              </Row>
            ))}
          </dl>
          <Button href={props.mapUrl} external size="lg" className="self-start">
            <Icon icon={Navigation} size={18} />
            {ui("directions")}
          </Button>
        </div>
        {hasMap ? (
          <iframe
            src={props.mapEmbedUrl}
            title={props.address}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-card border border-line"
          />
        ) : (
          <PhotoFrame
            src={null}
            alt={props.address}
            placeholder={props.mapEmbedUrl}
            pendingLabel={ui("mapPlaceholder")}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3]"
          />
        )}
      </div>
    </Section>
  );
}
