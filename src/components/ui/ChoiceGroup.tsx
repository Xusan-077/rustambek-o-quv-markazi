import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChoiceGroupProps {
  id: string;
  legend: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Radio group with a visible legend. 2–5 exclusive options read best as radios. */
export function ChoiceGroup({ id, legend, error, className, children }: ChoiceGroupProps) {
  return (
    <fieldset
      className={cn("flex flex-col gap-2", className)}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <legend className="mb-1.5 font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

type ChoiceOptionProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
};

/** A native radio inside a tappable label; the checked state styles the whole pill. */
export function ChoiceOption({ label, ref, ...input }: ChoiceOptionProps) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-btn border border-muted/60 bg-surface px-4 has-checked:border-brand has-checked:bg-brand-soft has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand">
      <input ref={ref} type="radio" className="size-4 accent-brand" {...input} />
      <span className="font-medium">{label}</span>
    </label>
  );
}
