@AGENTS.md

# Rustambek oqıw orayı — marketing sayt

Qoraqalpog'iston, Qo'ng'irot tumanidagi o'quv markazi: matematika milliy sertifikatiga tayyorlov,
mock testlar, kitoblar, kurslar. Hozircha faqat frontend; data `src/content/*.ts` da qo'lda turadi,
keyin Django REST API ulanadi.

## Ustuvorlik (har bir qarorda shunga qara)

1. **Markaz** — asosiy konversiya: kursga yozilish (`/kurslar#yozilish`) yoki qo'ng'iroq (`tel:`).
2. **Mock testlar** — ikkinchi daraja: bosh sahifada bitta navy band, alohida `/mock` sahifa.
3. **Kitoblar va onlayn kurs** — uchinchi daraja: menyuda yo'q, footer "Qo'shimcha" ustuni va kichik kartalar.

Header menyu: Markaz haqida `/markaz` · Kurslar `/kurslar` · Mock testlar `/mock` · Aloqa `/aloqa`.
Header CTA va mobil sticky bar: "Qo'ng'iroq qilish" + "Kursga yozilish". `/kitoblar`, `/natijalar` footer'da.

Buyruqlar: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format`.

## Stek (boshqa kutubxona qo'shma)

- Next.js 16 (App Router) + TypeScript (`strict: true`). `cacheComponents` o'chirilgan.
- Tailwind CSS v4: tokenlar `src/app/globals.css` dagi `@theme` da, `tailwind.config` yo'q.
  CSS `@tailwindcss/turbopack` loader orqali yuklanadi (`next.config.ts`).
- next-intl 4: tillar `uz` (default), `kaa` (UI'da "QQ"), `ru`. URL: `/uz`, `/kaa`, `/ru`.
  - Locale `next/root-params` orqali o'qiladi (`src/i18n/request.ts`); `setRequestLocale` deprecated, ishlatma.
  - Next 16 da `middleware.ts` → `src/proxy.ts`.
  - `kaa.json` da yo'q kalitlar avtomatik `uz.json` ga fallback qiladi (deep merge).
- React Hook Form + Yup (formalar), Framer Motion (faqat yengil kirish animatsiyasi,
  `useReducedMotion` majburiy), lucide-react, next/font (Space Grotesk + Inter, `latin-ext`).
- `clsx` + `tailwind-merge` → `cn()`. `bg-grid`/`bg-grid-light` tailwind-merge'da `bg-image` guruhiga qo'shilgan.
- pnpm, ESLint (next config), Prettier + prettier-plugin-tailwindcss.
- TanStack Query va Zustand KERAK EMAS.

## Folder struktura

```
src/
  app/
    [locale]/               # root layout shu yerda (<html lang>)
      layout.tsx  page.tsx  not-found.tsx  [...rest]/page.tsx
      markaz/ kurslar/ mock/ aloqa/ kitoblar/ natijalar/
    actions/enroll.ts       # Server Action: kursga yozilish → Telegram
    globals.css  sitemap.ts  robots.ts  favicon.ico
  components/
    ui/          # Button, Container, Section, SectionHeading, Badge, Card, Icon, PhotoFrame,
                 # FormField, ChoiceGroup — biznes logikasiz
    layout/      # Header, MobileMenu, NavLinks, Logo, Footer, LangSwitcher, MobileStickyCta
    sections/home/     # Hero, Subjects, MockBand, Extras, Faq
    sections/center/   # CenterHero, Gallery, CenterCta
    sections/courses/  # CourseFilters
    sections/contact/  # ChannelsList
    shared/      # EnrollSection/EnrollForm/EnrollDetails/EnrollSuccess, AdvantagesGrid, TeachersGrid,
                 # NextMockCard, ResultsOverview, ResultsBars, GrowBar, CertificateCard, CourseCard,
                 # VisitInfo, PageStub, JsonLd
  content/       # QO'LDA DATA: site, subjects, teachers, advantages, mocks, results, books, courses, faq, channels
  lib/
    data.ts      # getSite(), getNextMock(), getMocks(), getLatestResult(), getBooks(), getCourses(subject?), getFaq(scope) ...
    utils.ts     # cn(), t(), formatNumber(), formatDate(), formatTime(), formatPrice()
    seo.ts       # buildMetadata(), educationalOrganizationJsonLd(), SITE_URL
    metadata.ts  # pageMetadata(): har bir sahifaning generateMetadata'si
    routes.ts    # ROUTES, NAV_ROUTES, ANCHORS, COURSE_QUERY, coursesHref(), ENROLL_HREF
    view.ts      # subjectOptions(), subjectNameMap(), formatAddress() — props uchun
    phone.ts     # +998 maska va validatsiya
    schemas/enroll.ts  # Yup sxema: client va server bir xil
    telegram.ts  rate-limit.ts   # faqat serverda
  i18n/          # routing.ts, request.ts, navigation.ts
  types/         # content.ts (domen type'lari), next-intl.d.ts (typed messages)
  proxy.ts
messages/        # uz.json, kaa.json, ru.json — faqat UI matnlari
```

## Kod qoidalari

- Server Component default. `"use client"` faqat kichik interaktiv barglarda
  (MobileMenu, NavLinks, LangSwitcher, GrowBar, EnrollForm).
- `page.tsx` faqat section'larni yig'adi va `lib/data.ts` dan `await` bilan data oladi. Sahifada markup/logika yo'q.
- Komponentlar `content/` ni import QILMAYDI, faqat props oladi. `content/` ni faqat `lib/data.ts` o'qiydi.
- `lib/data.ts` funksiyalari `async` (keyin `fetch` bilan almashadi). Foiz, jami, bar uzunligi
  kabi hosilalar kodda hisoblanadi, data'da saqlanmaydi.
- Kontent lokalizatsiyasi: `Localized<T>` (`uz` va `ru` majburiy, `kaa` ixtiyoriy) + `t(localized, locale)`;
  `kaa` yo'q bo'lsa `uz` qaytadi. Nomlash: next-intl tarjimon `ui` (`const ui = useTranslations("hero")`),
  kontent helperi `t`.
- Bitta komponent = bitta fayl, PascalCase. 150 qatordan oshsa bo'lib tashla.
- `any` yo'q. Route'lar faqat `ROUTES` dan. Ranglar/o'lchamlar faqat tokenlar orqali, komponentda hex yo'q
  (yagona istisno: `viewport.themeColor`).
- Accessibility: semantik teglar, `<button>`/`<a>`, ikonka-tugmada `aria-label`, kontrast 4.5:1,
  touch target ≥ 44px (`min-h-touch`), aktiv menyuda `aria-current="page"`.
  Mobil menyu — native `<dialog>` + `showModal()`; FAQ — native `<details>`.
- Mobil-first (auditoriya Telegram'dan telefonda keladi). Emoji ishlatma.
- Placeholder data `"[NARX]"` ko'rinishida (`Placeholder` type) va `// TODO(client):` izohi bilan.
  Qoraqalpoq tarjimasiga ishonch bo'lmasa — `uz` fallback va `// TODO(kaa)`.

## Formalar va filtrlar

- Kursga yozilish: `EnrollForm` (`variant="compact"` bosh sahifada, `"full"` `/kurslar#yozilish` da).
  RHF + `yupResolver(enrollSchema)`, `mode: "onTouched"`. Xato matnlari `enroll.errors.*` kalitlari.
  Xatoli maydon: `aria-invalid` + xato `aria-describedby` da faqat ko'ringanda.
- Server Action `submitEnrollment`: qayta validatsiya → honeypot (`website`, to'lsa jim "success") →
  IP bo'yicha rate limit (10 daqiqada 5) → Telegram. Admin xabari doim o'zbekcha.
- Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. Dev'da yo'q bo'lsa xabar konsolga yoziladi.
- `/kurslar` filtrlari — oddiy linklar (`?fan=`, `?format=`, `aria-current`), ARIA tabs EMAS:
  JS'siz ishlaydi, ulashsa bo'ladi, server filtrlaydi (sahifa dinamik).

## Dizayn tokenlari (`globals.css` `@theme`)

```
--color-ink: #0E1726        asosiy matn
--color-muted: #4B5565      ikkinchi darajali matn
--color-line: #E3E7EE       chegara
--color-paper: #F6F7F9      sahifa foni
--color-surface: #FFFFFF
--color-navy: #0B1B3A       hero va CTA fon
--color-navy-text: #C9D3E6  navy ustidagi matn
--color-brand: #1F4FD8      link va tugma
--color-brand-soft: #EEF2FB
--color-accent: #F5A524     A+ sariq: faqat navy fonda yoki ink matn bilan
--color-accent-soft: #FEF3DC
--color-success: #1E6B34 / --color-success-soft: #E6F4EA
--color-danger: #B42318      forma xatolari (matn va chegara)
--radius-card: 18px; --radius-btn: 12px
--font-display: Space Grotesk; --font-sans: Inter
```

- Konteyner: `max-w-page` (1200px) + `px-6`. Section: `py-section` (64px) / `lg:py-section-lg` (96px).
- Hero va CTA: katak daftar foni `.bg-grid` (32px, `rgba(255,255,255,.07)`); oq fonda grafiklar uchun `.bg-grid-light`.
- Uslub: toza, ishonchli, "matematika" hissi. Gradient, glassmorphism, emoji yo'q.
  Kartalar soyasiz, `border-line` bilan; `shadow-lift` faqat hero natijalar kartasida.
