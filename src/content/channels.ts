import type { Channel } from "@/types/content";

const tg = (handle: string) => `https://t.me/${handle}`;

export const channels: Channel[] = [
  {
    id: "main",
    handle: "rustambek_oqiw_orayi",
    url: tg("rustambek_oqiw_orayi"),
    purpose: { uz: "Asosiy kanal", kaa: "Tiykarǵı kanal", ru: "Основной канал" },
  },
  {
    id: "admin",
    handle: "ROO_admin",
    url: tg("ROO_admin"),
    purpose: {
      uz: "Mockga yoziliş va çek yuboriş",
      kaa: "Mockqa jazılıw hám chek jiberiw",
      ru: "Запись на мок и отправка чека",
    },
  },
  {
    id: "books",
    handle: "ROO_kitoblar",
    url: tg("ROO_kitoblar"),
    purpose: {
      uz: "Kitoblar, Özbekiston böylab yetkazib beriş",
      kaa: "Kitaplar, Ózbekstan boylap jetkerip beriw",
      ru: "Книги, доставка по Узбекистану",
    },
  },
  {
    id: "onlineCourse",
    handle: "ROO_online_kurs",
    url: tg("ROO_online_kurs"),
    purpose: { uz: "Onlayn kurs", kaa: "Onlayn kurs", ru: "Онлайн-курс" },
  },
  {
    id: "offline",
    handle: "ROO_bas_imarat",
    url: tg("ROO_bas_imarat"),
    purpose: {
      uz: "Oflayn tayyorgarlik, boş bino",
      kaa: "Oflayn tayarlıq, bas imarat",
      ru: "Офлайн-подготовка, главное здание",
    },
  },
  {
    id: "bot",
    handle: "matematika_imtihon_bot",
    url: tg("matematika_imtihon_bot"),
    purpose: { uz: "Mock yeçiş boti", kaa: "Mock sheshiw botı", ru: "Бот для решения мока" },
  },
];
