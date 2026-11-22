import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";
import { FormField, pillControl } from "@/components/ui/FormField";
import { NAME_MAX, type EnrollInput } from "@/lib/schemas/enroll";

type Field = keyof EnrollInput;

interface FieldProps {
  register: UseFormRegister<EnrollInput>;
  id: (field: Field) => string;
  errorFor: (field: Field) => string | undefined;
  a11y: (
    field: Field,
    hint?: string,
  ) => { id: string; "aria-invalid": boolean; "aria-describedby"?: string };
}

export function EnrollNameField({ register, id, errorFor, a11y }: FieldProps) {
  const ui = useTranslations("enroll");
  return (
    <FormField
      id={id("fullName")}
      label={ui("fullName")}
      required
      requiredLabel={ui("requiredMark")}
      hideLabel
      className="sm:flex-1"
      error={errorFor("fullName")}
    >
      <input
        {...register("fullName")}
        {...a11y("fullName")}
        type="text"
        autoComplete="name"
        maxLength={NAME_MAX}
        enterKeyHint="next"
        placeholder={ui("namePlaceholder")}
        className={pillControl}
      />
    </FormField>
  );
}

/** Honeypot: off-screen, out of the tab order and hidden from assistive tech. */
export function EnrollHoneypot({ register, id }: Pick<FieldProps, "register" | "id">) {
  const ui = useTranslations("enroll");
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id("website")}>{ui("honeypot")}</label>
      <input
        {...register("website")}
        id={id("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
