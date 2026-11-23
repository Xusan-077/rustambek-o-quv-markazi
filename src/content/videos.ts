import type { VideoStory } from "@/types/content";

/**
 * Videos for the carousel on the home page, in this order.
 *
 * Each video comes from one of two places:
 *   Instagram: source: { kind: "instagram", url: "https://www.instagram.com/reel/XXXX/" }
 *   File:      source: { kind: "file", src: "/videos/ali.mp4" }   (put the file in public/videos/)
 *
 * poster: a cover picture in public/videos/. Instagram videos need one, because the site cannot
 * read Instagram's cover by itself; a file video without one shows its first frame.
 * The videos and covers below were saved from the centre's own reels on 2026-11-23, so they
 * play on the site without Instagram's frame around them.
 */
export const videos: VideoStory[] = [
  {
    id: "reel-1",
    // Instagram: https://www.instagram.com/reel/DfucyJaoSZI/
    source: { kind: "file", src: "/videos/reel-1.mp4" },
    poster: "/videos/reel-1.jpg",
  },
  {
    id: "reel-2",
    // Instagram: https://www.instagram.com/reel/DfUrh0lIKz9/
    source: { kind: "file", src: "/videos/reel-2.mp4" },
    poster: "/videos/reel-2.jpg",
  },
  {
    id: "reel-3",
    // Instagram: https://www.instagram.com/reel/DfKcrWboSbF/
    source: { kind: "file", src: "/videos/reel-3.mp4" },
    poster: "/videos/reel-3.jpg",
  },
  {
    id: "reel-4",
    // Instagram: https://www.instagram.com/reel/DfCrDU-oq4O/
    source: { kind: "file", src: "/videos/reel-4.mp4" },
    poster: "/videos/reel-4.jpg",
  },
  {
    id: "reel-5",
    // Instagram: https://www.instagram.com/reel/DZM_eY8I5Hp/
    source: { kind: "file", src: "/videos/reel-5.mp4" },
    poster: "/videos/reel-5.jpg",
  },
  {
    id: "reel-6",
    // Instagram: https://www.instagram.com/reel/DXpD0g8oH6U/
    source: { kind: "file", src: "/videos/reel-6.mp4" },
    poster: "/videos/reel-6.jpg",
  },
];
