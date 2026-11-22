"use client";

import { useState } from "react";
import type { CertificateImage } from "@/types/content";
import { CertificateLightbox, type LightboxItem } from "./CertificateLightbox";
import { CertificateRow } from "./CertificateRow";

export interface GalleryRow {
  slug: string;
  alt: string;
  openLabel: string;
  images: CertificateImage[];
}

interface CertificateGalleryProps {
  rows: GalleryRow[];
  durations: string[];
  labels: { pending: string; close: string; prev: string; next: string };
}

/**
 * All looping rows plus one shared viewer, so the arrows step through every certificate
 * (all subjects), not only the row that was clicked.
 */
export function CertificateGallery({ rows, durations, labels }: CertificateGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  const items: LightboxItem[] = [];
  const offsets: number[] = [];
  for (const row of rows) {
    offsets.push(items.length);
    for (const image of row.images) {
      if (image.src) items.push({ src: image.src, alt: row.alt });
    }
  }

  return (
    <>
      {rows.map((row, rowIndex) => {
        // Map a card's index in the row to its place among pictures that have a file.
        const withSrc = row.images.map((image, i) =>
          image.src ? row.images.slice(0, i).filter((other) => other.src).length : -1,
        );
        return (
          <CertificateRow
            key={row.slug}
            images={row.images}
            alt={row.alt}
            pendingLabel={labels.pending}
            openLabel={row.openLabel}
            onOpen={(i) => setOpen(offsets[rowIndex] + withSrc[i])}
            reverse={rowIndex % 2 === 1}
            duration={durations[rowIndex % durations.length]}
          />
        );
      })}
      <CertificateLightbox
        items={items}
        index={open}
        onIndexChange={setOpen}
        onClose={() => setOpen(null)}
        labels={labels}
      />
    </>
  );
}
