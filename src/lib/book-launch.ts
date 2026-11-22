/**
 * Hand-off between the book grid and a book's detail page during client navigation: the grid
 * records where the clicked book sat, the detail page flies its hero book in from there.
 * Plain module state on purpose: it only has to live for one navigation in one tab.
 */
export interface BookLaunch {
  slug: string;
  /** Viewport px at click time. */
  left: number;
  top: number;
  width: number;
}

let pending: BookLaunch | null = null;

export function setBookLaunch(launch: BookLaunch) {
  pending = launch;
}

/** Returns the launch for `slug` once, then forgets it (a reload or a later visit gets none). */
export function takeBookLaunch(slug: string) {
  const launch = pending?.slug === slug ? pending : null;
  pending = null;
  return launch;
}
