"use client";

import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const SHOW_MS = 4000;
const EVENT = "app:toast";

/** Shows a small toast in the top-right corner. Works from any client code; needs <Toaster /> mounted once. */
export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }));
}

export function Toaster() {
  const [message, setMessage] = useState<{ text: string; key: number } | null>(null);

  useEffect(() => {
    let timer = 0;
    const onToast = (event: Event) => {
      window.clearTimeout(timer);
      setMessage({ text: (event as CustomEvent<string>).detail, key: Date.now() });
      timer = window.setTimeout(() => setMessage(null), SHOW_MS);
    };
    window.addEventListener(EVENT, onToast);
    return () => {
      window.removeEventListener(EVENT, onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed top-4 right-4 left-4 z-50 flex justify-end md:top-6 md:right-6 md:left-auto"
    >
      {message ? (
        <p
          key={message.key}
          className="toast-in flex items-center gap-2.5 rounded-btn border border-line bg-surface px-4 py-3 text-sm font-medium text-ink shadow-lift"
        >
          <Icon icon={CircleCheck} size={20} className="text-success" />
          {message.text}
        </p>
      ) : null}
    </div>
  );
}
