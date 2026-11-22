import type { Advantage } from "@/types/content";

// Only verifiable facts: no invented numbers.
export const advantages: Advantage[] = [
  {
    id: "weekly-mock",
    title: {
      uz: "Haftalik mock testlar",
      kaa: "Háptelik mock testler",
      ru: "Еженедельные мок-тесты",
    },
    text: {
      uz: "Milliy sertifikat standartida: 45 savol, 150 daqiqa. Darajangizni imtihondan oldin bilasiz.",
      kaa: "Milliy sertifikat standartında: 45 soraw, 150 minut.",
      ru: "По стандарту национального сертификата: 45 вопросов, 150 минут. Вы узнаёте свой уровень до экзамена.",
    },
  },
  {
    id: "video-solutions",
    title: { uz: "Video yeçimlar", kaa: "Video sheshimler", ru: "Видеоразборы" },
    text: {
      uz: "Har bir mockdan keyin savollar YouTube'da tahlil qilinadi.",
      kaa: "Hár bir mocktan keyin sorawlar YouTube'ta talqılanadı.", // TODO(kaa): tekshirish
      ru: "После каждого мока вопросы разбираются на YouTube.",
    },
  },
  {
    id: "three-languages",
    title: { uz: "3 tilda test", kaa: "3 tilde test", ru: "Тесты на 3 языках" },
    text: {
      uz: "Savollar özbek, qoraqalpoq va rus tillarida beriladi.",
      kaa: "Sorawlar ózbek, qaraqalpaq hám rus tillerinde beriledi.",
      ru: "Вопросы на узбекском, каракалпакском и русском языках.",
    },
  },
  {
    id: "own-books",
    title: { uz: "Muallif kitoblari", kaa: "Avtor kitapları", ru: "Авторские книги" },
    text: {
      uz: "A+ 100, A+ va Attestatsiya: mock savollari asosida tuzilgan.",
      kaa: "A+ 100, A+ hám Attestatsiya: mock sorawları tiykarında dúzilgen.",
      ru: "A+ 100, A+ и «Аттестация»: составлены на основе вопросов моков.",
    },
  },
  {
    id: "community",
    title: {
      uz: "65K+ Telegram hamjamiyati",
      kaa: "65K+ Telegram jámiyeti",
      ru: "65K+ в Telegram",
    },
    text: {
      uz: "Mock e'lonlari, natijalar va tahlillar kanalda birinçi çiqadi.",
      kaa: "Mock daǵazaları, nátiyjeler hám talqılawlar kanalda birinshi shıǵadı.", // TODO(kaa): tekshirish
      ru: "Анонсы моков, результаты и разборы первыми выходят в канале.",
    },
  },
  {
    id: "online-offline",
    title: { uz: "Oflayn va onlayn", kaa: "Oflayn hám onlayn", ru: "Офлайн и онлайн" },
    text: {
      uz: "Qönğirotdagi binoda guruh darslari yoki matematika onlayn kursi.",
      kaa: "Qońırattaǵı imaratta topar sabaqları yamasa matematika onlayn kursı.",
      ru: "Групповые занятия в здании в Кунграде или онлайн-курс по математике.",
    },
  },
];
