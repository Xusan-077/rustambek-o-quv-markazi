import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared look for text inputs, selects and textareas. 16px+ text avoids iOS zoom. */
export const controlClasses =
  "w-full min-h-12 rounded-btn border border-muted/60 bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/80 aria-[invalid=true]:border-danger aria-[invalid=true]:border-2";

/** Rounded grey pill input used in the enrollment row. */
export const pillControl =
  "h-14 w-full rounded-full border-2 border-transparent bg-paper px-6 text-base text-ink placeholder:text-muted/70 motion-safe:transition-colors focus:border-brand focus:bg-surface aria-[invalid=true]:border-danger";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  requiredLabel?: string;
  /** Keep the label for screen readers only (the placeholder shows what to type). */
  hideLabel?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Ids a control should reference; the error id is only listed while an error is shown. */
export function fieldDescribedBy(id: string, { hint, error }: { hint?: string; error?: string }) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function FormField({
  id,
  label,
  required,
  requiredLabel,
  hideLabel,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "font-medium"}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-0.5 text-brand">
              *
            </span>
            {requiredLabel ? <span className="sr-only"> ({requiredLabel})</span> : null}
          </>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
