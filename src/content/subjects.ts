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
    plan: { months: 9, lessonsPerWeek: 3, lessonMinutes: 90 }, // TODO(client): haqiqiy muddat va jadval
    // TODO(client): afzalliklarni tasdiqlash
    features: {
      uz: [
        "Milliy sertifikat formatidagi masalalar",
        "Har hafta mock test va tahlil",
        "Har bir öquvçiga support teacher",
        "Uy vazifasi va xatolar ustida işlaş",
      ],
      ru: [
        "Задачи в формате национального сертификата",
        "Еженедельный мок-тест с разбором",
        "Support teacher для каждого ученика",
        "Работа над домашним заданием и ошибками",
      ],
    },
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
    plan: { months: 9, lessonsPerWeek: 3, lessonMinutes: 90 }, // TODO(client): haqiqiy muddat va jadval
    // TODO(client): afzalliklarni tasdiqlash
    features: {
      uz: [
        "Darajaga qarab guruhlar",
        "Grammatika va söz boyligi",
        "Har darsda speaking amaliyoti",
        "Oylik test bilan natijani tekşiriş",
      ],
      ru: [
        "Группы по уровню",
        "Грамматика и словарный запас",
        "Разговорная практика на каждом занятии",
        "Ежемесячный тест для проверки результата",
      ],
    },
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
    plan: { months: 9, lessonsPerWeek: 3, lessonMinutes: 90 }, // TODO(client): haqiqiy muddat va jadval
    // TODO(client): afzalliklarni tasdiqlash
    features: {
      uz: [
        "Darajaga qarab guruhlar",
        "Grammatika va kelişiklar",
        "Ögzaki nutq va öqiş amaliyoti",
        "Oylik test bilan natijani tekşiriş",
      ],
      ru: [
        "Группы по уровню",
        "Грамматика и падежи",
        "Практика устной речи и чтения",
        "Ежемесячный тест для проверки результата",
      ],
    },
  },
];
