import type { CertificateHolder, CertificateImage, MockResult, Video } from "@/types/content";

export const mockResults: MockResult[] = [
  {
    mockNumber: 146,
    distribution: { "A+": 32, A: 32, "B+": 76, B: 212, "C+": 315, C: 339, none: 494 },
  },
  {
    mockNumber: 48,
    distribution: { "A+": 35, A: 59, "B+": 129, B: 220, "C+": 336, C: 312, none: 588 },
  },
];

const analysis = (part: number): Video["title"] => ({
  uz: `Milliy sertifikat imtihon tahlili, 2025-dekabr, ${part}-qism`,
  // TODO(kaa): "imtixan analizi" iborasini tekshirish
  kaa: `Milliy sertifikat imtixan analizi, 2025-dekabr, ${part}-bólim`,
  ru: `Разбор экзамена национального сертификата, декабрь 2025, часть ${part}`,
});

export const examAnalysisVideos: Video[] = [
  { title: analysis(1), url: "https://youtu.be/xNtdmeYOc-Q" },
  { title: analysis(2), url: "https://youtu.be/foc3pxy6aYA" },
  { title: analysis(3), url: "https://youtu.be/JVcgMrQXq9c" },
  { title: analysis(4), url: "https://youtu.be/A1IWlWyHi9E" },
];

// TODO(client): sertifikat olgan o'quvchilarning ismi, tumani, darajasi va rasmi
export const certificateHolders: CertificateHolder[] = [
  { id: "holder-1", name: "[ISM]", district: "[TUMAN]", grade: "A+", photo: null },
  { id: "holder-2", name: "[ISM]", district: "[TUMAN]", grade: "A+", photo: null },
  { id: "holder-3", name: "[ISM]", district: "[TUMAN]", grade: "A", photo: null },
  { id: "holder-4", name: "[ISM]", district: "[TUMAN]", grade: "B+", photo: null },
];

// TODO(client): hozircha har fan uchun bitta namuna rasm takrorlanadi (public/certificates/).
// Haqiqiy sertifikatlarni public/certificates/<fan>-<n>.jpg ga qo'yib, src ni almashtiring.
export const certificateImages: CertificateImage[] = [
  { id: "cert-matematika-1", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-2", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-3", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-4", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-5", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-6", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-7", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-8", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-9", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-matematika-10", subject: "matematika", src: "/certificates/matematika-a.jpg" },
  { id: "cert-ingliz-tili-1", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-2", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-3", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-4", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-5", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-6", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-7", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-8", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-9", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-ingliz-tili-10", subject: "ingliz-tili", src: "/certificates/ingliz-tili-b2.jpg" },
  { id: "cert-rus-tili-1", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-2", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-3", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-4", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-5", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-6", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-7", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-8", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-9", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
  { id: "cert-rus-tili-10", subject: "rus-tili", src: "/certificates/rus-tili-b.jpg" },
];
