/**
 * Server-only helper: sends a message to the admin chat via the Telegram Bot API.
 * Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (never exposed to the browser).
 * Do not import this from client components.
 */

const API_BASE = "https://api.telegram.org";
const TIMEOUT_MS = 8_000;

export function escapeTelegramHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Local development without credentials: log instead of failing the form.
    if (process.env.NODE_ENV !== "production") {
      console.info("[telegram] env not set, message not sent:\n" + html);
      return true;
    }
    console.error("[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing");
    return false;
  }

  try {
    const response = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) console.error("[telegram] sendMessage failed", response.status);
    return response.ok;
  } catch (error) {
    console.error("[telegram] sendMessage error", error);
    return false;
  }
}
