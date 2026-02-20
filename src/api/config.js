export const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';
export const OPEN_LIBRARY_SEARCH_PATH = '/search.json';
export const OPEN_LIBRARY_WORKS_PATH = '/works';
export const OPEN_LIBRARY_AUTHORS_PATH = '/authors';
export const SEARCH_RESULTS_LIMIT = 20;

const WORKS_PREFIX = '/works/';
const AUTHORS_PREFIX = '/authors/';
const COVER_BASE = 'https://covers.openlibrary.org/b/id';

export function buildSearchUrl(query) {
  const q = String(query || '')
    .trim()
    .replaceAll(/\s+/g, '+');

  const base = `${OPEN_LIBRARY_BASE_URL}${OPEN_LIBRARY_SEARCH_PATH}`;
  return `${base}?q=${encodeURIComponent(q)}`;
}

export function buildWorkUrl(id) {
  return `${OPEN_LIBRARY_BASE_URL}${OPEN_LIBRARY_WORKS_PATH}/${id}.json`;
}

export function buildAuthorUrl(id) {
  return `${OPEN_LIBRARY_BASE_URL}${OPEN_LIBRARY_AUTHORS_PATH}/${id}.json`;
}
export function getCoverUrl(coverId) {
  if (!coverId) return null;
  return `${COVER_BASE}/${coverId}.jpg`;
}

export function stripWorkIdPrefix(key) {
  if (key == null || key === '') return key;
  const s = String(key);
  return s.startsWith(WORKS_PREFIX) ? s.slice(WORKS_PREFIX.length) : s;
}

export function stripAuthorIdPrefix(key) {
  if (key == null || key === '') return key;
  const s = String(key);
  return s.startsWith(AUTHORS_PREFIX) ? s.slice(AUTHORS_PREFIX.length) : s;
}
