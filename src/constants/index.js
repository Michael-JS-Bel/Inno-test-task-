export const TEXT_CONSTANTS = {
  BACK: 'Back to search',
  GO_TO_SEARCH: 'Go to search',
  PAGE_NOT_FOUND: 'Page not found',
  SEARCH_BOOK: 'Search books',
  SELECTED_BOOK: 'Selected book',
  THE_LIBRARY: 'The Library',
  LIBRARY_PREVIEW: 'Discover your next favorite book',
  SEARCH_PLACEHOLDER: 'Search for books by title or author...',
  LOADING: 'Loading...',
  SEARCH_TITLE: 'Discover Your Next Great Read',
  SEARCH_SUBTITLE:
    'Search millions of books, build your personal library, and never lose track of what to read next.',
  SEARCH_HINT: 'Enter more than 3 characters to search',
  BOOK_ERROR: 'Failed to load book',
  BOOK_NO_DESCRIPTION: 'No description available.',
  NOT_SPECIFIED: 'Information not specified',
  UNKNOWN: 'Unknown',
  YEAR_EM_DASH: '—',
  NO_COVER: 'No Cover',
  POWERED_BY_OP_LI: 'Powered by Open Library',
  ALL_AUTHORS: 'All authors',
};

export const STORAGE_KEYS = {
  SEARCH_QUERY: 'search_query',
  FAVORITES: 'book-catalog-favorites',
  THEME: 'book-catalog-theme',
};

export const BUTTON_TEXT = {
  SEARCH: 'Search',
  SEARCHING: 'Searching...',
};

export const FAVORITES_CONSTANTS = {
  TITLE: 'Favorites',
  BOOKS_SAVED: (count) => `${count} ${count === 1 ? 'book' : 'books'} saved`,
  EMPTY: 'No favorites yet',
};

export const MESSAGES = {
  idle: '',
  loading: TEXT_CONSTANTS.LOADING,
  error: 'Network error',
  empty: 'Nothing found',
  success: '',
};
