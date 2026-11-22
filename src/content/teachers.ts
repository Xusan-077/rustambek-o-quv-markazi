import type { Teacher } from "@/types/content";

// TODO(client): ustozlarning ismi, tajribasi, qisqa tavsifi va rasmi
export const teachers: Teacher[] = [
  {
    id: "rustambek",
    name: "Rustambek Mambetsapaev",
    subject: "matematika",
    experience: "[TAJRIBA]",
    // TODO(client): tavsifni asoschi bilan tasdiqlash
    bio: {
      uz: "Markaz asosçisi. Milliy sertifikatga tayyorlaydi, A+ va Attestatsiya kitoblari muallifi.",
      ru: "Основатель центра. Готовит к национальному сертификату, автор книг A+ и «Аттестация».",
    },
    photo: "/founder.png",
  },
  {
    id: "english-teacher",
    name: "[USTOZ]",
    subject: "ingliz-tili",
    experience: "[TAJRIBA]",
    bio: "[TAVSIF]",
    photo: null,
  },
  {
    id: "russian-teacher",
    name: "[USTOZ]",
    subject: "rus-tili",
    experience: "[TAJRIBA]",
    bio: "[TAVSIF]",
    photo: null,
  },
];
