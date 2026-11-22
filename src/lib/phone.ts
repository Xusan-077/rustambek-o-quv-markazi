/** Uzbek phone numbers: +998 followed by 9 local digits, shown as the mask "+998 (90) 123-45-67". */
export const UZ_PREFIX = "+998";
const UZ_LOCAL_DIGITS = 9;

/**
 * The 9 local digits of whatever the user typed or pasted. The "+998" prefix is removed
 * wherever it sits (the caret may be before it); a bare "998..." counts as the country
 * code only when it is longer than a local number.
 */
export function localPhoneDigits(value: string | undefined | null) {
  let digits = (value ?? "").replace(UZ_PREFIX, "").replace(/\D/g, "");
  if (digits.startsWith("998") && digits.length > UZ_LOCAL_DIGITS) digits = digits.slice(3);
  return digits.slice(0, UZ_LOCAL_DIGITS);
}

export function isValidUzPhone(value: string | undefined | null) {
  return localPhoneDigits(value).length === UZ_LOCAL_DIGITS;
}

/** Input mask "+998 (__) ___-__-__": typed digits fill the blanks from left to right. */
export function formatUzPhone(value: string) {
  const d = localPhoneDigits(value).padEnd(UZ_LOCAL_DIGITS, "_");
  return `${UZ_PREFIX} (${d.slice(0, 2)}) ${d.slice(2, 5)}-${d.slice(5, 7)}-${d.slice(7, 9)}`;
}

/** Caret position right after the last typed digit (the first blank of the mask). */
export function phoneCaretIndex(masked: string) {
  const blank = masked.indexOf("_");
  return blank === -1 ? masked.length : blank;
}

/** E.164 form for tel: links and messages, e.g. "+998901234567". */
export function toE164(value: string) {
  return `${UZ_PREFIX}${localPhoneDigits(value)}`;
}
