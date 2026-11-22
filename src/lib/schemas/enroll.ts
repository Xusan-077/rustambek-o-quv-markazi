import * as yup from "yup";
import { isValidUzPhone } from "@/lib/phone";

/** Shared by the client form and the server action: one source of validation truth. */

export const NAME_MAX = 80;

/** Error messages are message keys under `enroll.errors` in messages/*.json. */
export type EnrollErrorKey = "required" | "nameShort" | "nameLong" | "phoneInvalid";

const err = (key: EnrollErrorKey) => key;

export const enrollSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required(err("required"))
    .min(3, err("nameShort"))
    .max(NAME_MAX, err("nameLong")),
  phone: yup
    .string()
    .required(err("required"))
    .test("uz-phone", err("phoneInvalid"), (value) => isValidUzPhone(value)),
  /** Honeypot: hidden from people, bots tend to fill it. Must stay empty. */
  website: yup.string().default(""),
});

export type EnrollInput = yup.InferType<typeof enrollSchema>;
