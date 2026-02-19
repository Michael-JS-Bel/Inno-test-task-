import { STORAGE_KEYS } from '@/constants';

export function saveSearchQuery(query) {
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    globalThis.localStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, query);
  }
}

export function loadSearchQuery() {
  try {
    if (typeof globalThis === 'undefined' || !globalThis.localStorage) {
      return '';
    }
    return globalThis.localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || '';
  } catch {
    return '';
  }
}
