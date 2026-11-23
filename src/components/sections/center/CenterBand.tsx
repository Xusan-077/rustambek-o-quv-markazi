/** Four-pointed star between the band's words. */
function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 fill-accent md:size-8">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/**
 * A slightly tilted navy ribbon that runs across the bottom of the hero, repeating what the
 * centre teaches. Decorative: the same words are on the page in readable form.
 */
export function CenterBand({ items }: { items: string[] }) {
  return (
    <div aria-hidden="true" className="marquee relative -mx-[5vw] -rotate-2 bg-navy py-4 md:py-5">
      <div className="marquee-track" style={{ animationDuration: "40s" }}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-copy flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 pr-6 font-display text-2xl font-bold whitespace-nowrap text-surface md:gap-8 md:pr-8 md:text-4xl"
              >
                {item}
                <Star />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
