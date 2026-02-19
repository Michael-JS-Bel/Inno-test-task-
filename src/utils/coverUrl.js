const COVER_BASE = 'https://covers.openlibrary.org/b/id';

export function getCoverUrl(coverId) {
  if (!coverId) return null;
  return `${COVER_BASE}/${coverId}.jpg`;
}
