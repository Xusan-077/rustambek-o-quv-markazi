import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  id: string;
  name: string;
  href: string;
  badge: string | null;
  /** Duration, lessons per week, lesson length: value on top, label under it. */
  facts: { value: string; label: string }[];
  featuresLabel: string;
  features: string[];
  detailsLabel: string;
  /** The main subject gets the navy treatment. */
  primary: boolean;
}

/** One subject's course: how long and how often it runs, then what is in it. */
export function SubjectCard({
  id,
  name,
  href,
  badge,
  facts,
  featuresLabel,
  features,
  detailsLabel,
  primary,
}: SubjectCardProps) {
  return (
    <li
      aria-labelledby={id}
      className={cn(
        "flex flex-col gap-6 rounded-card border p-6 md:p-7",
        primary ? "on-navy border-navy bg-navy text-surface" : "border-line bg-surface",
      )}
    >
      <h3 id={id} className="font-display text-2xl font-bold md:text-3xl">
        {name}
      </h3>

      <dl
        className={cn(
          "grid grid-cols-3 divide-x border-y py-4",
          primary ? "divide-surface/15 border-surface/15" : "divide-line border-line",
        )}
      >
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1 px-3 first:pl-0 last:pr-0">
            <dt className={cn("order-2 text-sm", primary ? "text-navy-text" : "text-muted")}>
              {fact.label}
            </dt>
            <dd className="order-1 font-display text-lg leading-tight font-bold xl:text-xl">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3">
        <p className={cn("text-sm font-semibold", primary ? "text-navy-text" : "text-muted")}>
          {featuresLabel}
        </p>
        <ul className="flex flex-col gap-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-2 size-1.5 shrink-0 rounded-full",
                  primary ? "bg-accent" : "bg-brand",
                )}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <Link
          href={href}
          className={cn(
            "inline-flex min-h-touch items-center font-semibold underline underline-offset-4",
            primary
              ? "text-accent decoration-accent/40 hover:decoration-accent"
              : "text-brand decoration-brand/30 hover:decoration-brand",
          )}
        >
          {detailsLabel}
          <span className="sr-only">: {name}</span>
        </Link>
        {badge ? <Badge tone="onNavy">{badge}</Badge> : null}
      </div>
    </li>
  );
}
