import type { Course, Localized } from "@/types/content";

const mainBuilding: Localized = {
  uz: "Qönğirot, boş bino",
  kaa: "Qońırat, bas imarat",
  ru: "Кунград, главное здание",
};

export const courses: Course[] = [
  {
    slug: "matematika-onlayn",
    subject: "matematika",
    format: "online",
    title: {
      uz: "Matematika onlayn: MS 6.0",
      kaa: "Matematika onlayn: MS 6.0",
      ru: "Математика онлайн: MS 6.0",
    },
    description: {
      uz: "Yopiq guruhda milliy sertifikatga tayyorgarlik. Yangi guruh oçildi.",
      kaa: "Jabıq toparda milliy sertifikatqa tayarlıq. Jańa topar ashıldı.",
      ru: "Подготовка к национальному сертификату в закрытой группе. Открыт набор в новую группу.",
    },
    location: null,
    // Namuna jadval: 10–21-fevral oralig'ida 24 ta mock, kuniga 2 tadan.
    schedule: {
      uz: "10–21-fevral: 24 ta mock, kuniga 2 tadan (biri jonli, biri video)",
      kaa: "10–21-fevral: 24 mock, kúnine 2 den (biri tikkeley, biri video)", // TODO(kaa): tekshirish
      ru: "10–21 февраля: 24 мока, по 2 в день (один в прямом эфире, один в записи)",
    },
    duration: "[MUDDAT]", // TODO(client): kurs muddati
    price: "[NARX]", // TODO(client): kurs narxi
    channel: "onlineCourse",
    // Telegram, 2026-11-22: hozir ochiq bo'lgan guruhlar
    cohorts: [
      {
        uz: "2026-noyabr milliy sertifikat",
        kaa: "2026-noyabr milliy sertifikat",
        ru: "Национальный сертификат, ноябрь 2026",
      },
      {
        uz: "2027-fevral milliy sertifikat",
        kaa: "2027-fevral milliy sertifikat",
        ru: "Национальный сертификат, февраль 2027",
      },
      {
        uz: "2027-bahor attestatsiya",
        kaa: "2027-báhár attestatsiya", // TODO(kaa): tekshirish
        ru: "Аттестация, весна 2027",
      },
    ],
  },
  ...(
    [
      ["matematika", { uz: "Matematika", kaa: "Matematika", ru: "Математика" }],
      ["ingliz-tili", { uz: "Ingliz tili", kaa: "Inglis tili", ru: "Английский язык" }],
      ["rus-tili", { uz: "Rus tili", kaa: "Rus tili", ru: "Русский язык" }],
    ] as const
  ).map(([subject, title]): Course => ({
    slug: `${subject}-oflayn`,
    subject,
    format: "offline",
    title,
    description: {
      uz: "Qönğirotdagi boş binoda guruh darslari.",
      kaa: "Qońırattaǵı bas imaratta topar sabaqları.",
      ru: "Групповые занятия в главном здании в Кунграде.",
    },
    location: mainBuilding,
    schedule: "[JADVAL]", // TODO(client): dars jadvali
    duration: "[MUDDAT]", // TODO(client): kurs muddati
    price: "[NARX]", // TODO(client): kurs narxi
    channel: "offline",
    cohorts: [],
  })),
];
