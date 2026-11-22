import type { Mock } from "@/types/content";

const base = {
  subject: "matematika",
  durationMinutes: 150,
  questionCount: 45,
  price: 15_000,
  languages: ["uz", "kaa", "ru"],
  formats: ["online", "offline"],
} satisfies Partial<Mock>;

/** Checked against https://t.me/s/rustambek_oqiw_orayi on 2026-11-22. */
export const mocks: Mock[] = [
  {
    ...base,
    number: 147,
    startsAt: "2026-11-22T10:00:00+05:00",
    status: "open", // TODO(client): mock tugagach "finished" ga o'zgartirish
  },
  {
    ...base,
    number: 146,
    startsAt: "2026-11-19T20:00:00+05:00",
    status: "finished",
    videoSolutionUrl: undefined, // TODO(client): 146-mock video yechim havolasi
  },
  {
    ...base,
    number: 48,
    startsAt: null, // TODO(client): 48-mock sanasi
    status: "finished",
    videoSolutionUrl: "https://youtu.be/ydgHXJftZ6Y",
  },
  {
    ...base,
    number: 44,
    startsAt: null, // TODO(client): 44-mock sanasi
    status: "finished",
    videoSolutionUrl: "https://youtu.be/um4msHiOQrA",
  },
];
