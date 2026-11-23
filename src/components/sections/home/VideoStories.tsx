import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { instagramEmbedUrl } from "@/lib/view";
import { isPlaceholder } from "@/lib/utils";
import type { VideoSource, VideoStory } from "@/types/content";
import type { VideoCardData, VideoPlayer } from "./VideoCard";
import { VideoCarousel } from "./VideoCarousel";

function playerFor(source: VideoSource): VideoPlayer | null {
  if (source.kind === "file") return { kind: "file", src: source.src };
  const embedUrl = instagramEmbedUrl(source.url);
  return embedUrl ? { kind: "instagram", url: source.url, embedUrl } : null;
}

/** Short videos from the centre in a sideways carousel. */
export function VideoStories({ videos }: { videos: VideoStory[] }) {
  const ui = useTranslations("videos");

  const cards: VideoCardData[] = videos.map((video, index) => ({
    id: video.id,
    label: ui("play", { number: index + 1 }),
    poster: video.poster,
    player: isPlaceholder(video.source) ? null : playerFor(video.source),
  }));
  if (cards.length === 0) return null;

  return (
    <Section labelledBy="videos-title">
      <VideoCarousel
        heading={
          <div className="flex flex-col gap-3">
            <h2 id="videos-title" className="text-3xl leading-tight font-bold md:text-5xl">
              {ui("title")}
            </h2>
            <p className="max-w-2xl text-lg text-muted">{ui("lead")}</p>
          </div>
        }
        videos={cards}
        labels={{
          prev: ui("prev"),
          next: ui("next"),
          pending: ui("pending"),
          instagram: ui("instagram"),
          close: ui("close"),
          openInstagram: ui("openInstagram"),
        }}
      />
    </Section>
  );
}
