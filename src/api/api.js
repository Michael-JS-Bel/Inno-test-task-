import { TEXT_CONSTANTS } from '@/constants';

import {
  buildAuthorUrl,
  buildSearchUrl,
  buildWorkUrl,
  SEARCH_RESULTS_LIMIT,
  stripAuthorIdPrefix,
  stripWorkIdPrefix,
} from './config';

const NOT_SPECIFIED = TEXT_CONSTANTS.NOT_SPECIFIED;
export async function searchBooks(query, options = {}) {
  if (!query || !String(query).trim()) {
    return [];
  }

  const url = buildSearchUrl(query);

  const response = await fetch(url, {
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const data = await response.json();
  const docs = Array.isArray(data.docs) ? data.docs : [];

  return docs.slice(0, SEARCH_RESULTS_LIMIT).map((doc) => ({
    id: stripWorkIdPrefix(doc.key) || doc.cover_i?.toString() || String(Math.random()),
    title: doc.title || TEXT_CONSTANTS.UNKNOWN,
    authors: Array.isArray(doc.author_name)
      ? doc.author_name
      : doc.author_name
        ? [doc.author_name]
        : [],
    authorName: Array.isArray(doc.author_name)
      ? doc.author_name.join(', ')
      : doc.author_name || TEXT_CONSTANTS.UNKNOWN,
    firstPublishYear: doc.first_publish_year ?? null,
    coverId: doc.cover_i ?? null,
  }));
}

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

  const id = stripWorkIdPrefix(workId);
  const url = buildWorkUrl(id);
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
      const authorId = stripAuthorIdPrefix(authorKey);
      const authorRes = await fetch(buildAuthorUrl(authorId));
      if (authorRes.ok) {
        const author = await authorRes.json();
        authorName = author.personal_name || author.name || NOT_SPECIFIED;
      }
    } catch {
      authorName = NOT_SPECIFIED;
    }
  }

  return {
    id: stripWorkIdPrefix(work.key) || id,
    title: work.title || NOT_SPECIFIED,
    authorName,
    description: description || NOT_SPECIFIED,
    coverId: coverId > 0 ? coverId : null,
    firstPublishYear: work.first_publish_date
      ? String(work.first_publish_date).slice(0, 4)
      : NOT_SPECIFIED,
  };
}
