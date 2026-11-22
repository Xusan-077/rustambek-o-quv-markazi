import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "outlineOnNavy" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-touch items-center justify-center gap-2 rounded-btn font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-surface hover:bg-ink",
  accent: "bg-accent text-ink hover:bg-surface",
  outline: "border border-line bg-surface text-ink hover:border-ink",
  outlineOnNavy: "border border-surface/25 text-surface hover:border-surface hover:bg-surface/5",
  quiet: "px-0 text-brand underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "px-4 text-sm",
  lg: "px-5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> & {
    href: string;
    /** Opens outside the app (Telegram, YouTube, tel:). */
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = LinkProps | NativeButtonProps;

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "quiet" && sizes[size], className);
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, href, external, ...rest } = props;
    const classes = buttonClasses(variant, size, className);
    if (external) {
      const opensNewTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
