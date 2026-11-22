import type { Book, BookDelivery } from "@/types/content";

// TODO(client): delivery time and cost.
export const bookDelivery: BookDelivery = { time: "[MUDDAT]", cost: "[NARX]" };

/*
 * Facts (counts, years, what is inside) are copied from the book covers.
 * TODO(client): har bir kitobning narxi va bet soni; tavsiflarni tasdiqlash.
 * TODO(kaa): qoraqalpoqcha matnlar (hozircha o'zbekcha ko'rinadi).
 */

const AUTHOR = "Mambetsapayev Rustambek";

const NATIONAL_CERTIFICATE = { uz: "Milliy sertifikat", ru: "Национальный сертификат" };

export const books: Book[] = [
  {
    slug: "a-plus-100",
    title: "A+ 100",
    series: NATIONAL_CERTIFICATE,
    mark: "A+ 100",
    author: AUTHOR,
    description: {
      uz: "45 ta misol turi: har biriga 100 tadan misol va video yeçimlar.",
      ru: "45 типов задач: по 100 примеров на каждый и видеоразборы.",
    },
    about: {
      uz: "Milliy sertifikat matematika imtihonidagi har bir misol turini alohida işlab çiqiş uçun kitob. Imtihonda tuşadigan 45 ta misol turining har biriga 100 tadan tayyorlov misoli berilgan, har bir tur böyiça 25 ta misolning video yeçimi bor.",
      ru: "Книга для отработки каждого типа задач экзамена на национальный сертификат по математике. На каждый из 45 типов задач, которые встречаются на экзамене, дано по 100 тренировочных примеров, а 25 примеров каждого типа разобраны в видео.",
    },
    features: {
      uz: [
        "2025-yil 2-yarmida BMBA imtihonida tuşgan savollar",
        "Imtihonda tuşadigan 45 ta misol turi asosida",
        "Har bir misol turi uçun 100 tadan tayyorlov misoli",
        "Har bir misol böyiça 25 ta misolning video yeçimi",
        "Töliq javoblari bilan",
      ],
      ru: [
        "Вопросы экзамена БМБА второй половины 2025 года",
        "Построена на 45 типах задач экзамена",
        "По 100 тренировочных примеров на каждый тип",
        "Видеоразбор 25 примеров по каждому типу",
        "С полными ответами",
      ],
    },
    featured: true,
    price: "[NARX]",
    pages: "[BET]",
    cover: "/books/a-plus-100.jpg",
    demo: { pdf: "/pdf-books-demo/A+100 Kitobi (demo).pdf", pages: 25 },
  },
  {
    slug: "a-plus",
    title: "A+",
    series: NATIONAL_CERTIFICATE,
    mark: "A+",
    author: AUTHOR,
    description: {
      uz: "15 ta BMBA va 25 ta mock: jami 40 variant, video yeçimlari bilan.",
      ru: "15 вариантов БМБА и 25 мок-тестов: 40 вариантов с видеоразборами.",
    },
    about: {
      uz: "Milliy sertifikatda tuşgan va tuşişi ehtimoli bor savollardan tuzilgan töplam. BMBA imtihonida tuşgan 15 ta test va 25 ta qöşimça mock test: jami 40 ta variant, javoblari va video yeçimlari bilan.",
      ru: "Сборник из вопросов, которые встречались и могут встретиться на национальном сертификате. 15 тестов с экзамена БМБА и 25 дополнительных мок-тестов: всего 40 вариантов с ответами и видеоразборами.",
    },
    features: {
      uz: [
        "15 ta BMBA imtihonida tuşgan test savollari",
        "25 ta qöşimça mock test savollari",
        "Jami 40 ta variant",
        "Javoblari va video yeçimlari bilan birgalikda",
      ],
      ru: [
        "15 тестов с экзамена БМБА",
        "25 дополнительных мок-тестов",
        "Всего 40 вариантов",
        "С ответами и видеоразборами",
      ],
    },
    featured: false,
    price: "[NARX]",
    pages: "[BET]",
    cover: "/books/a-plus.jpg",
    demo: { pdf: "/pdf-books-demo/A+ kitobi (Demo variant).pdf", pages: 22 },
  },
  {
    slug: "a-plus-2-qism",
    title: "A+ 2-qism",
    series: NATIONAL_CERTIFICATE,
    mark: "A+ 2",
    author: AUTHOR,
    description: {
      uz: "15 ta BMBA va 25 ta mock: jami 40 variant, javoblari bilan birga.",
      ru: "15 вариантов БМБА и 25 мок-тестов: 40 вариантов с ответами.",
    },
    about: {
      uz: "A+ kitobining davomi. BMBA imtihonida tuşgan 15 ta test va 25 ta qöşimça mock test: jami 40 ta variant, javoblari bilan birgalikda.",
      ru: "Продолжение книги A+. 15 тестов с экзамена БМБА и 25 дополнительных мок-тестов: всего 40 вариантов с ответами.",
    },
    features: {
      uz: [
        "15 ta BMBA imtihonida tuşgan test savollari",
        "25 ta qöşimça mock test savollari",
        "Jami 40 ta variant",
        "Javoblari bilan birgalikda",
      ],
      ru: [
        "15 тестов с экзамена БМБА",
        "25 дополнительных мок-тестов",
        "Всего 40 вариантов",
        "С ответами",
      ],
    },
    featured: false,
    price: "[NARX]",
    pages: "[BET]",
    cover: "/books/a-plus-2-qism.jpg",
    demo: null, // TODO(client): A+ 2-qism demo PDF
  },
  {
    slug: "attestatsiya",
    title: "Attestatsiya 86+",
    series: { uz: "Attestatsiya", ru: "Аттестация" },
    mark: "86+",
    author: AUTHOR,
    description: {
      uz: "2022–2026-yillar savollari: jami 50 variant, 35 talik testlar.",
      ru: "Вопросы 2022–2026 годов: всего 50 вариантов по 35 вопросов.",
    },
    about: {
      uz: "Öqituvçilar attestatsiyasiga tayyorlaniş uçun matematika kitobi. 2022–2026-yillarda imtihonda tuşgan va tuşiş ehtimoli bor 35 talik testlar jamlanmasi: jami 50 ta variant, javoblari bilan.",
      ru: "Книга по математике для подготовки к аттестации учителей. Тесты по 35 вопросов, которые встречались на экзамене в 2022–2026 годах и могут встретиться: всего 50 вариантов с ответами.",
    },
    features: {
      uz: [
        "2022–2025-yillarda imtihonda tuşgan 29 ta 35 talik test",
        "2026-yil bahorgi imtihonda tuşgan 11 ta 35 talik test",
        "Qöşimça ehtimoliy 10 ta 35 talik test",
        "Jami 50 ta variant",
        "Javoblari bilan birgalikda",
      ],
      ru: [
        "29 тестов по 35 вопросов с экзаменов 2022–2025 годов",
        "11 тестов по 35 вопросов с весенней аттестации 2026 года",
        "10 дополнительных вероятных тестов по 35 вопросов",
        "Всего 50 вариантов",
        "С ответами",
      ],
    },
    featured: false,
    price: "[NARX]",
    pages: "[BET]",
    cover: "/books/attestatsiya.jpg",
    demo: { pdf: "/pdf-books-demo/Attestatsiya kitobi DEMO versiya.pdf", pages: 30 },
  },
];
