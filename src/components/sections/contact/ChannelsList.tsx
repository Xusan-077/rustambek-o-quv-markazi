import { ArrowUpRight, Camera, Send, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface ChannelsListProps {
  channels: { id: string; handle: string; url: string; purpose: string }[];
  instagramUrl: string;
}

interface ChannelCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  text?: string;
}

/** Whole card is a link; a navy fill rises from the bottom on hover/focus and the arrow nudges. */
function ChannelCard({ href, icon, title, text }: ChannelCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full min-h-touch items-center gap-4 overflow-hidden rounded-card border border-line bg-surface p-5 hover:-translate-y-1 hover:border-navy focus-visible:border-navy motion-safe:transition-[border-color,translate] motion-safe:duration-300"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-navy group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-safe:transition-transform motion-safe:duration-300"
      />
      <span className="relative grid size-11 shrink-0 place-items-center rounded-btn bg-brand-soft text-brand group-hover:bg-accent group-hover:text-ink group-focus-visible:bg-accent group-focus-visible:text-ink motion-safe:transition-colors motion-safe:duration-300">
        <Icon icon={icon} />
      </span>
      <span className="relative flex min-w-0 flex-1 flex-col">
        <span className="truncate font-semibold group-hover:text-surface group-focus-visible:text-surface motion-safe:transition-colors">
          {title}
        </span>
        {text ? (
          <span className="text-sm text-muted group-hover:text-navy-text group-focus-visible:text-navy-text motion-safe:transition-colors">
            {text}
          </span>
        ) : null}
      </span>
      <Icon
        icon={ArrowUpRight}
        size={20}
        className="relative shrink-0 text-muted group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent group-focus-visible:text-accent motion-safe:transition-[translate,color] motion-safe:duration-300"
      />
    </a>
  );
}

export function ChannelsList({ channels, instagramUrl }: ChannelsListProps) {
  const ui = useTranslations("contact");
  const footer = useTranslations("footer");

  return (
    <Section labelledBy="channels-title">
      <SectionHeading id="channels-title" title={ui("channelsTitle")} lead={ui("channelsLead")} />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel, index) => (
          <Reveal as="li" delay={Math.min(index, 5) * 0.06} key={channel.id}>
            <ChannelCard
              href={channel.url}
              icon={Send}
              title={`@${channel.handle}`}
              text={channel.purpose}
            />
          </Reveal>
        ))}
        <Reveal as="li" delay={0.3}>
          <ChannelCard href={instagramUrl} icon={Camera} title={footer("instagram")} />
        </Reveal>
      </ul>
    </Section>
  );
}
