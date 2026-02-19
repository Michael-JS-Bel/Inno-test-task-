const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';

function buildSearchUrl(query) {
  const q = String(query || '')
    .trim()
    .replaceAll(/\s+/g, '+');
  return `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(q)}`;
}

export async function searchBooks(query) {
  if (!query || !String(query).trim()) {
    throw new Error('Empty query');
  }

  const url = buildSearchUrl(query);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const data = await response.json();
  const docs = data.docs || [];
  const limit = 20;

  return docs.slice(0, limit).map((doc) => ({
    id: doc.key?.replace('/works/', '') || doc.cover_i?.toString() || String(Math.random()),
    title: doc.title || 'Unknown',
    authorName: Array.isArray(doc.author_name)
      ? doc.author_name.join(', ')
      : doc.author_name || 'Unknown',
    firstPublishYear: doc.first_publish_year ?? null,
    coverId: doc.cover_i ?? null,
  }));
}

const OPEN_LIBRARY_WORKS_BASE = 'https://openlibrary.org';
const NOT_SPECIFIED = 'Information not specified';

function getDescriptionString(description) {
  if (!description) return null;
  if (typeof description === 'string') return description;
  if (description.value) return description.value;
  return null;
}

export async function getBookById(workId) {
  if (!workId || !String(workId).trim()) {
    throw new Error('Invalid work id');
  }

  const id = workId.startsWith('/works/') ? workId.replace('/works/', '') : workId;
  const url = `${OPEN_LIBRARY_WORKS_BASE}/works/${id}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const work = await response.json();
  const coverId = Array.isArray(work.covers) && work.covers.length > 0 ? work.covers[0] : null;
  const description = getDescriptionString(work.description);

  let authorName = NOT_SPECIFIED;
  const authorKey = work.authors?.[0]?.author?.key;
  if (authorKey) {
    try {
      const authorId = authorKey.startsWith('/authors/')
        ? authorKey.replace('/authors/', '')
        : authorKey;
      const authorRes = await fetch(`${OPEN_LIBRARY_WORKS_BASE}/authors/${authorId}.json`);
      if (authorRes.ok) {
        const author = await authorRes.json();
        authorName = author.personal_name || author.name || NOT_SPECIFIED;
      }
    } catch {
      authorName = NOT_SPECIFIED;
    }
  }

  return {
    id: work.key?.replace('/works/', '') || id,
    title: work.title || NOT_SPECIFIED,
    authorName,
    description: description || NOT_SPECIFIED,
    coverId: coverId > 0 ? coverId : null,
    firstPublishYear: work.first_publish_date
      ? String(work.first_publish_date).slice(0, 4)
      : NOT_SPECIFIED,
  };
}
