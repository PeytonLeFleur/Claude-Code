// Pure photo-list helpers for inspections. Kept out of the UI so they're testable.
export const MAX_PHOTOS = 8;

/**
 * Merge newly-picked photo URIs into an existing list: de-duplicates, preserves
 * order (existing first, then new), and caps the total at `max`. Never mutates
 * the inputs.
 */
export function mergePhotos(
  existing: string[] = [],
  incoming: string[] = [],
  max = MAX_PHOTOS,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const uri of [...existing, ...incoming]) {
    if (!uri || seen.has(uri)) continue;
    seen.add(uri);
    out.push(uri);
    if (out.length >= max) break;
  }
  return out;
}

/** Remove one URI from the list (returns a new array). */
export function removePhoto(photos: string[] = [], uri: string): string[] {
  return photos.filter((p) => p !== uri);
}
