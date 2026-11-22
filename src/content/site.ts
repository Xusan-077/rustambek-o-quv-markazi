import type { Site } from "@/types/content";

export const site: Site = {
  name: {
    uz: "Rustambek öquv markazi",
    kaa: "Rustambek oqıw orayı",
    ru: "Учебный центр Rustambek",
  },
  slogan: {
    uz: "Matematika milliy sertifikat",
    kaa: "Matematika milliy sertifikat",
    ru: "Национальный сертификат по математике",
  },
  address: {
    region: {
      uz: "Qoraqalpoğiston Respublikasi",
      kaa: "Qaraqalpaqstan Respublikası",
      ru: "Республика Каракалпакстан",
    },
    district: {
      uz: "Qönğirot tumani",
      kaa: "Qońırat rayonı",
      ru: "Кунградский район",
    },
    street: "[MANZIL]", // TODO(client): aniq ko'cha va mo'ljal
  },
  phones: [
    { display: "+998 33 113 51 51", tel: "+998331135151" },
    { display: "+998 94 123 51 51", tel: "+998941235151" },
  ],
  workHours: { opens: "09:00", closes: "18:00" },
  telegramSubscribers: 65_400,
  instagramUrl: "https://www.instagram.com/rustambek_oqiw_orayi/",
  // TODO(client): markazning aniq joyi (hozircha Toshkent markazi). lon,lat ni almashtiring.
  mapUrl: "https://yandex.com/maps/?ll=69.2401%2C41.2995&z=16&pt=69.2401%2C41.2995&l=map",
  mapEmbedUrl:
    "https://yandex.com/map-widget/v1/?ll=69.2401%2C41.2995&z=16&pt=69.2401%2C41.2995%2Cpm2rdm&l=map&scroll=false",
  founderPhoto: "/founder.png",
  buildingPhoto: null, // TODO(client): bino rasmi ([BINO RASMI])
  // TODO(client): bino va xonalar rasmlari (4–6 ta)
  gallery: [
    {
      id: "facade",
      src: null,
      alt: { uz: "Bino taşqi körinişi", kaa: "Imarattıń sırtqı kórinisi", ru: "Фасад здания" },
    },
    {
      id: "classroom-1",
      src: null,
      alt: { uz: "Dars xonasi", kaa: "Sabaq xanası", ru: "Учебный класс" },
    },
    {
      id: "classroom-2",
      src: null,
      alt: { uz: "Dars xonasi", kaa: "Sabaq xanası", ru: "Учебный класс" },
    },
    {
      id: "mock-hall",
      src: null,
      alt: {
        uz: "Mock test ötadigan zal",
        kaa: "Mock test ótetuǵın zal",
        ru: "Зал для мок-тестов",
      },
    },
    { id: "library", src: null, alt: { uz: "Kitoblar", kaa: "Kitaplar", ru: "Книги" } },
    { id: "reception", src: null, alt: { uz: "Qabulxona", kaa: "Qabılxana", ru: "Ресепшн" } },
  ],
  payment: {
    cardHolder: "Serikov Bekjan",
    cardNumber: "[KARTA]", // TODO(client): to'lov kartasi raqami
  },
};
