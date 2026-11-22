import type { Subject } from "@/types/content";

export const subjects: Subject[] = [
  {
    slug: "matematika",
    name: { uz: "Matematika", kaa: "Matematika", ru: "Математика" },
    description: {
      uz: "Milliy sertifikatga tayyorgarlik: onlayn va oflayn kurslar.",
      kaa: "Milliy sertifikatqa tayarlıq: onlayn hám oflayn kurslar.",
      ru: "Подготовка к национальному сертификату: онлайн- и офлайн-курсы.",
    },
    isPrimary: true,
    hasMock: true,
  },
  {
    slug: "ingliz-tili",
    name: { uz: "Ingliz tili", kaa: "Inglis tili", ru: "Английский язык" },
    description: {
      uz: "Oflayn guruhlar Qönğirotdagi boş binoda.",
      kaa: "Oflayn toparlar Qońırattaǵı bas imaratta.",
      ru: "Офлайн-группы в главном здании в Кунграде.",
    },
    isPrimary: false,
    hasMock: false,
  },
  {
    slug: "rus-tili",
    name: { uz: "Rus tili", kaa: "Rus tili", ru: "Русский язык" },
    description: {
      uz: "Oflayn guruhlar Qönğirotdagi boş binoda.",
      kaa: "Oflayn toparlar Qońırattaǵı bas imaratta.",
      ru: "Офлайн-группы в главном здании в Кунграде.",
    },
    isPrimary: false,
    hasMock: false,
  },
];
