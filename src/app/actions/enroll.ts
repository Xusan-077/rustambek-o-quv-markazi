"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { toE164 } from "@/lib/phone";
import { rateLimit } from "@/lib/rate-limit";
import { enrollSchema, type EnrollInput } from "@/lib/schemas/enroll";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

export type EnrollResult =
  { status: "success" } | { status: "error"; reason: "invalid" | "rateLimited" | "failed" };

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

/** Admin messages are always in Uzbek, whatever language the visitor used. */
async function formatMessage(data: EnrollInput, pageLocale: string) {
  const ui = await getTranslations({ locale: "uz", namespace: "enroll" });
  const rows: [string, string][] = [
    [ui("fullName"), data.fullName],
    [ui("phone"), toE164(data.phone)],
    [ui("pageLanguage"), pageLocale],
  ];
  const title = ui("telegramTitle");
  return [
    `<b>${escapeTelegramHtml(title)}</b>`,
    "",
    ...rows.map(([label, value]) => `${escapeTelegramHtml(label)}: ${escapeTelegramHtml(value)}`),
  ].join("\n");
}

export async function submitEnrollment(input: unknown, pageLocale: string): Promise<EnrollResult> {
  let data: EnrollInput;
  try {
    data = await enrollSchema.validate(input, { abortEarly: true, stripUnknown: true });
  } catch {
    return { status: "error", reason: "invalid" };
  }

  // Honeypot filled: answer like a success so bots learn nothing.
  if (data.website) return { status: "success" };

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";
  if (!rateLimit(`enroll:${ip}`, RATE_LIMIT)) return { status: "error", reason: "rateLimited" };

  const sent = await sendTelegramMessage(await formatMessage(data, pageLocale.slice(0, 5)));
  return sent ? { status: "success" } : { status: "error", reason: "failed" };
}
