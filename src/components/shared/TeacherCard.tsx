import { Award, BookOpen, GraduationCap } from "lucide-react";
import { EnrollModal } from "@/components/layout/EnrollModal";
import { Icon } from "@/components/ui/Icon";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import type { Phone } from "@/types/content";

interface TeacherCardProps {
  name: string;
  subject: string;
  experience: string;
  bio: string;
  photo: string | null;
  phone: Phone;
  labels: { experience: string; enroll: string; close: string; photoPending: string };
}

/**
 * White frame around a tall photo. The subject sits in a pill at the top; the lower part of
 * the photo melts into a progressive blur that carries name, bio, facts and a white pill button.
 */
export function TeacherCard({
  name,
  subject,
  experience,
  bio,
  photo,
  phone,
  labels,
}: TeacherCardProps) {
  return (
    <article className="group h-full rounded-[28px] border border-line bg-surface p-2.5">
      <div className="relative isolate aspect-[5/7] overflow-hidden rounded-[20px] bg-navy">
        <PhotoFrame
          src={photo}
          alt={`${name}, ${subject}`}
          placeholder="[RASM]"
          pendingLabel={labels.photoPending}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="absolute inset-0 size-full rounded-none group-hover:scale-[1.04] motion-safe:transition-transform motion-safe:duration-700"
        />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-navy/45 px-4 py-2 text-sm font-semibold text-surface backdrop-blur-md">
          <Icon icon={BookOpen} size={16} />
          {subject}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-navy/45 text-surface backdrop-blur-md"
        >
          <Icon icon={GraduationCap} size={20} />
        </span>

        {/* Progressive blur: the photo dissolves into frosted glass towards the bottom. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-navy/85 via-navy/50 to-transparent mask-t-from-55% backdrop-blur-xl"
        />

        <div className="on-navy absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 text-surface md:p-5">
          <h3 className="font-display text-xl leading-tight font-bold md:text-2xl">{name}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-surface/85">{bio}</p>
          <p className="flex items-center gap-2 text-sm text-surface/90">
            <Icon icon={Award} size={18} />
            {labels.experience}: {experience}
          </p>
          <EnrollModal
            phone={phone}
            label={labels.enroll}
            closeLabel={labels.close}
            size="lg"
            variant="outline"
            className="mt-1 w-full rounded-full border-surface"
          />
        </div>
      </div>
    </article>
  );
}
