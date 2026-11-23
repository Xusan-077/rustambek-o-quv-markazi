import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/lib/routes";
import { isPlaceholder, t } from "@/lib/utils";
import type { Phone, SubjectSlug, Teacher } from "@/types/content";
import { TeacherCard } from "./TeacherCard";
import { Reveal } from "@/components/ui/Reveal";

interface TeachersGridProps {
  teachers: Teacher[];
  subjectNames: Record<SubjectSlug, string>;
  phone: Phone;
  /** Show a link to the centre page (on the home page). */
  showCenterLink?: boolean;
  tone?: "surface" | "paper";
}

/** Heading plus one TeacherCard per teacher: a looping row on phones, a grid from `sm` up. */
export function TeachersGrid({
  teachers,
  subjectNames,
  phone,
  showCenterLink,
  tone = "surface",
}: TeachersGridProps) {
  const locale = useLocale();
  const ui = useTranslations("teachers");
  const common = useTranslations("common");

  const card = (teacher: Teacher) => (
    <TeacherCard
      name={teacher.name}
      subject={subjectNames[teacher.subject]}
      experience={
        isPlaceholder(teacher.experience) ? teacher.experience : t(teacher.experience, locale)
      }
      bio={isPlaceholder(teacher.bio) ? teacher.bio : t(teacher.bio, locale)}
      photo={teacher.photo}
      phone={phone}
      labels={{
        experience: ui("experienceLabel"),
        enroll: common("enroll"),
        close: common("close"),
        photoPending: common("photoPending"),
      }}
    />
  );

  return (
    <Section tone={tone} labelledBy="teachers-title">
      <Reveal className="mb-10 text-center md:mb-14">
        <h2
          id="teachers-title"
          className="text-3xl leading-tight font-extrabold tracking-wide uppercase md:text-5xl"
        >
          {ui("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">{ui("lead")}</p>
      </Reveal>

      {/* Phones: an endless row that drifts sideways; touching or focusing it pauses it. */}
      <div className="marquee -mx-6 overflow-hidden sm:hidden">
        <div className="marquee-track" style={{ animationDuration: `${teachers.length * 10}s` }}>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              // The second copy only fills the loop: hidden from screen readers and Tab.
              aria-hidden={copy === 1}
              inert={copy === 1}
              className="marquee-copy flex shrink-0 gap-4 pr-4 first:pl-6"
            >
              {teachers.map((teacher) => (
                <li key={teacher.id} className="w-[78vw] max-w-80 shrink-0">
                  {card(teacher)}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <ul className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher, index) => (
          <Reveal as="li" delay={index * 0.1} key={teacher.id}>
            {card(teacher)}
          </Reveal>
        ))}
      </ul>

      {showCenterLink ? (
        <div className="mt-10 flex justify-center">
          <Button href={ROUTES.center} variant="outline">
            {common("aboutCenter")}
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
