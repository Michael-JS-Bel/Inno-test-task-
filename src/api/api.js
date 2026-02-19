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
