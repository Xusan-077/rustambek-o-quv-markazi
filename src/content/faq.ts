import type { FaqItem } from "@/types/content";

// Answers use only facts confirmed by the centre. Home scope: centre questions first,
// then one or two about mocks.
export const faq: FaqItem[] = [
  {
    id: "subjects",
    scope: "home",
    question: {
      uz: "Markazda qaysi fanlar öqitiladi?",
      kaa: "Orayda qaysı pánler oqıtıladı?",
      ru: "Какие предметы преподают в центре?",
    },
    answer: {
      uz: "Matematika, ingliz tili va rus tili. Matematikada milliy sertifikatga alohida tayyorgarlik bor.",
      kaa: "Matematika, inglis tili hám rus tili. Matematikada milliy sertifikatqa arnawlı tayarlıq bar.",
      ru: "Математика, английский и русский язык. По математике есть отдельная подготовка к национальному сертификату.",
    },
  },
  {
    id: "location",
    scope: "home",
    question: {
      uz: "Markaz qayerda joylaşgan?",
      kaa: "Oray qay jerde jaylasqan?",
      ru: "Где находится центр?",
    },
    answer: {
      uz: "Qoraqalpoğiston Respublikasi, Qönğirot tumani, boş bino. Iş vaqti 9:00 dan 18:00 gaça.",
      kaa: "Qaraqalpaqstan Respublikası, Qońırat rayonı, bas imarat. Jumıs waqtı 9:00 den 18:00 ge shekem.",
      ru: "Республика Каракалпакстан, Кунградский район, главное здание. Время работы с 9:00 до 18:00.",
    },
  },
  {
    id: "enroll",
    scope: "home",
    question: {
      uz: "Kursga qanday yozilaman?",
      kaa: "Kursqa qalay jazılaman?",
      ru: "Как записаться на курс?",
    },
    answer: {
      uz: "Saytdagi arizani töldiring yoki +998 33 113 51 51 raqamiga qönğiroq qiling. Administrator siz bilan boğlanadi.",
      kaa: "Sayttaǵı arzanı toltırıń yamasa +998 33 113 51 51 nomerine qońıraw etiń. Administrator siz benen baylanısadı.",
      ru: "Заполните заявку на сайте или позвоните по номеру +998 33 113 51 51. Администратор свяжется с вами.",
    },
  },
  {
    id: "online",
    scope: "home",
    question: {
      uz: "Onlayn öqiş mumkinmi?",
      kaa: "Onlayn oqıw múmkinbe?",
      ru: "Можно ли учиться онлайн?",
    },
    answer: {
      uz: "Ha, matematika böyiça onlayn kurs bor (MS 6.0 yopiq guruhi). Admin @ROO_online_kurs orqali 9:00 dan 18:00 gaça javob beradi.",
      kaa: "Awa, matematika boyınsha onlayn kurs bar (MS 6.0 jabıq toparı). Admin @ROO_online_kurs arqalı 9:00 den 18:00 ge shekem juwap beredi.",
      ru: "Да, есть онлайн-курс по математике (закрытая группа MS 6.0). Администратор отвечает в @ROO_online_kurs с 9:00 до 18:00.",
    },
  },
  {
    id: "mock-what",
    scope: "mock",
    question: {
      uz: "Mock test nima va qança turadi?",
      kaa: "Mock test ne hám qansha turadı?",
      ru: "Что такое мок-тест и сколько он стоит?",
    },
    answer: {
      uz: "Milliy sertifikat standartidagi sinov imtihoni: 45 savol, 150 daqiqa. Narxi 15 000 söm. Onlayn bot orqali yoki markaz binosida yeçiladi.",
      kaa: "Milliy sertifikat standartındaǵı sınaq imtixanı: 45 soraw, 150 minut. Bahası 15 000 sum.", // TODO(kaa): tekshirish
      ru: "Пробный экзамен по стандарту национального сертификата: 45 вопросов, 150 минут. Стоимость 15 000 сумов. Решается онлайн через бота или в здании центра.",
    },
  },
  {
    id: "mock-after",
    scope: "mock",
    question: {
      uz: "Mockdan keyin nima olaman?",
      kaa: "Mocktan keyin ne alaman?",
      ru: "Что я получу после мока?",
    },
    answer: {
      uz: "Daraja hisoboti, javob kalitlari, har bir savolning qiyinlik darajasi va YouTube'da video yeçim.",
      // TODO(kaa): tekshirish
      kaa: "Dáreje esabatı, juwap giltleri, hár bir sorawdıń qıyınlıq dárejesi hám YouTube'ta video sheshim.",
      ru: "Отчёт об уровне, ключи ответов, сложность каждого вопроса и видеоразбор на YouTube.",
    },
  },
  {
    id: "mock-registration",
    scope: "mock",
    question: {
      uz: "Mockga qanday yoziladi?",
      kaa: "Mockqa qalay jazıladı?",
      ru: "Как записаться на мок?",
    },
    answer: {
      uz: "15 000 sömni kartaga ötkazing va tölov çekini @ROO_admin ga yuboring.",
      kaa: "15 000 sumdı kartaǵa ótkerip, tólem chekin @ROO_admin ǵa jiberiń.",
      ru: "Переведите 15 000 сумов на карту и отправьте чек об оплате в @ROO_admin.",
    },
  },
  {
    id: "mock-languages",
    scope: "mock",
    question: {
      uz: "Savollar qaysi tillarda beriladi?",
      kaa: "Sorawlar qaysı tillerde beriledi?",
      ru: "На каких языках даются вопросы?",
    },
    answer: {
      uz: "Özbek, qoraqalpoq va rus tillarida.",
      kaa: "Ózbek, qaraqalpaq hám rus tillerinde.",
      ru: "На узбекском, каракалпакском и русском.",
    },
  },
  {
    id: "mock-video",
    scope: "mock",
    question: {
      uz: "Video yeçim qayerda çiqadi?",
      kaa: "Video sheshim qay jerde shıǵadı?",
      ru: "Где выходит видеоразбор?",
    },
    answer: {
      uz: "Mockdan keyin YouTube'da. Havola Telegram kanalda e'lon qilinadi.",
      kaa: "Mocktan keyin YouTube'ta. Siltew Telegram kanalda járiyalanadı.",
      ru: "После мока на YouTube. Ссылку публикуем в Telegram-канале.",
    },
  },
  {
    id: "books-delivery",
    scope: "mock",
    question: {
      uz: "Kitoblarni boşqa viloyatga yuborasizmi?",
      kaa: "Kitaplardı basqa wálayatqa jiberesizbe?",
      ru: "Отправляете ли вы книги в другие регионы?",
    },
    answer: {
      uz: "Ha, Özbekiston böylab yetkazib beriladi. Buyurtma @ROO_kitoblar orqali.",
      kaa: "Awa, Ózbekstan boylap jetkerip beriledi. Buyırtpa @ROO_kitoblar arqalı.",
      ru: "Да, доставляем по всему Узбекистану. Заказ через @ROO_kitoblar.",
    },
  },
];
