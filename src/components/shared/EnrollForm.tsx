"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { submitEnrollment, type EnrollResult } from "@/app/actions/enroll";
import { Button } from "@/components/ui/Button";
import { fieldDescribedBy, FormField, pillControl } from "@/components/ui/FormField";
import { Icon } from "@/components/ui/Icon";
import { showToast } from "@/components/ui/Toaster";
import { formatUzPhone, localPhoneDigits, phoneCaretIndex } from "@/lib/phone";
import { enrollSchema, type EnrollErrorKey, type EnrollInput } from "@/lib/schemas/enroll";
import { cn } from "@/lib/utils";
import type { Phone } from "@/types/content";
import { EnrollHoneypot, EnrollNameField } from "./EnrollDetails";

interface EnrollFormProps {
  variant: "compact" | "full" | "modal";
  phone: Phone;
  labelledBy?: string;
  /** Called after a successful submit (the modal closes itself here). */
  onSuccess?: () => void;
}

type FailureReason = Extract<EnrollResult, { status: "error" }>["reason"];

const PHONE_MASK = formatUzPhone("");

export function EnrollForm({ variant, phone, labelledBy, onSuccess }: EnrollFormProps) {
  const locale = useLocale();
  const ui = useTranslations("enroll");
  const [failure, setFailure] = useState<FailureReason | null>(null);
  const id = (field: keyof EnrollInput) => `enroll-${variant}-${field}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnrollInput>({
    resolver: yupResolver(enrollSchema),
    mode: "onTouched", // validate on leaving a field, then live while it is fixed
    shouldFocusError: false, // RHF focuses in registration order; we focus in DOM order below
    defaultValues: { fullName: "", phone: "", website: "" },
  });

  const errorFor = (field: keyof EnrollInput) => {
    const key = errors[field]?.message as EnrollErrorKey | undefined;
    return key ? ui(`errors.${key}`) : undefined;
  };
  const fieldA11y = (field: keyof EnrollInput, hint?: string) => ({
    id: id(field),
    "aria-invalid": Boolean(errorFor(field)),
    "aria-describedby": fieldDescribedBy(id(field), { hint, error: errorFor(field) }),
  });

  const onSubmit = handleSubmit(
    async (values) => {
      setFailure(null);
      const result = await submitEnrollment(values, locale);
      if (result.status === "success") {
        reset({ fullName: "", phone: "", website: "" });
        showToast(ui("successTitle"));
        onSuccess?.();
      } else {
        setFailure(result.reason);
      }
    },
    (invalid, event) => {
      const form = event?.target instanceof HTMLFormElement ? event.target : null;
      const fields = form?.querySelectorAll<HTMLElement>("input, select, textarea") ?? [];
      [...fields].find((el) => (el.getAttribute("name") ?? "") in invalid)?.focus();
    },
  );
  const phoneField = register("phone");

  /** Writes the masked value into the input and puts the caret after the last typed digit. */
  function applyMask(input: HTMLInputElement, digits: string) {
    input.value = digits ? formatUzPhone(digits) : "";
    void phoneField.onChange({ target: input, type: "change" });
    const caret = phoneCaretIndex(input.value);
    requestAnimationFrame(() => input.setSelectionRange(caret, caret));
  }

  function onPhoneChange(event: ChangeEvent<HTMLInputElement>) {
    applyMask(event.target, localPhoneDigits(event.target.value));
  }

  /** Backspace removes the last typed digit (the mask's separators are never "deleted"). */
  function onPhoneKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    if (event.key !== "Backspace" || input.selectionStart !== input.selectionEnd) return;
    event.preventDefault();
    applyMask(input, localPhoneDigits(input.value).slice(0, -1));
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={labelledBy}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <EnrollNameField register={register} id={id} errorFor={errorFor} a11y={fieldA11y} />

        <FormField
          id={id("phone")}
          label={ui("phone")}
          required
          requiredLabel={ui("requiredMark")}
          hideLabel
          error={errorFor("phone")}
          className="sm:flex-1"
        >
          <input
            {...phoneField}
            {...fieldA11y("phone")}
            onChange={onPhoneChange}
            onKeyDown={onPhoneKeyDown}
            placeholder={PHONE_MASK}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="send"
            className={cn(pillControl, "tabular-nums")}
          />
        </FormField>

        <EnrollHoneypot register={register} id={id} />

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={isSubmitting}
          className="group h-14 shrink-0 rounded-full px-8 text-base"
        >
          {isSubmitting ? ui("submitting") : ui("submit")}
          <Icon
            icon={ArrowRight}
            size={20}
            className="group-hover:translate-x-1 motion-safe:transition-transform"
          />
        </Button>
      </div>

      {failure ? (
        <p role="alert" className="rounded-btn bg-accent-soft px-4 py-3 text-ink">
          {ui(`failure.${failure}`, { phone: phone.display })}
        </p>
      ) : null}
    </form>
  );
}
