import { searchBooks } from '@/api/api';
import { Favorites, SearchIntro, SearchPlaceholder, SearchResults } from '@/components';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement, favoritesService } from '@/utils';

import { SearchController } from './SearchController';
import { extractAuthors, filterBooksByAuthor } from './searchFilters';
import styles from './SearchPage.module.css';

export class SearchPage {
  constructor() {
    this.controller = new SearchController(searchBooks);
    this._onControllerUpdate = (data) => this.updateView(data);
    this.controller.subscribe(this._onControllerUpdate);

    this._handleResultsClick = (e) => {
      const card = e.target.closest('[data-book-id]');
      const btn = e.target.closest('button');
      if (!card || !btn || !card.contains(btn)) return;
      const id = card.dataset.bookId;
      const book = this.currentBooks.find((b) => b.id === id);
      if (!book) return;
      favoritesService.toggle(book);
      this.rerenderFavorites();
    };

    this._handleFavoritesClick = (e) => {
      const card = e.target.closest('[data-book-id]');
      const btn = e.target.closest('button');
      if (!card || !btn || !card.contains(btn)) return;
      const id = card.dataset.bookId;
      const book = favoritesService.get().find((b) => b.id === id);
      if (!book) return;
      favoritesService.toggle(book);
      this.rerenderFavorites();
    };

    this.currentBooks = [];
    this.selectedAuthor = null;
  }

  destroy() {
    this.resultsWrap?.removeEventListener('click', this._handleResultsClick);
    this.favoritesWrap?.removeEventListener('click', this._handleFavoritesClick);
    this.controller.unsubscribe(this._onControllerUpdate);
    this.controller.abort();
  }

  updateView({ state, books }) {
    this.updateStatus(state);

    if (state === 'success') {
      this.currentBooks = books;
      const visibleBooks = this.applyFilters();

      this.searchResults.setBooks(visibleBooks);
      this.updateAuthorFilters(books);
    } else {
      this.currentBooks = [];
      this.searchResults.setBooks([]);

      if (this.searchIntro) {
        this.searchIntro.setFiltersEnabled(false);
        this.searchIntro.setAuthors([]);
      }
    }

    if (this.placeholderWrap) {
      this.placeholderWrap.style.display = state === 'idle' ? '' : 'none';
    }
  }

  applyFilters() {
    return filterBooksByAuthor(this.currentBooks, this.selectedAuthor);
  }

  updateAuthorFilters(books) {
    if (!this.searchIntro) return;

    const authors = extractAuthors(books);

    this.searchIntro.setAuthors(authors);
    this.searchIntro.setFiltersEnabled(authors.length > 0);
  }

  updateStatus(state) {
    const messages = {
      idle: '',
      loading: TEXT_CONSTANTS.LOADING,
      error: 'Network error',
      empty: 'Nothing found',
      success: '',
    };

    const message = messages[state] || '';

    this.statusEl.textContent = message;
    this.statusEl.style.display = message ? 'block' : 'none';
  }

  handleSearch(query) {
    this.controller.search(query);
  }

  rerenderFavorites() {
    if (this.favoritesWrap) {
      this.favoritesWrap.textContent = '';
      this.favoritesWrap.append(new Favorites().render());
    }

    if (this.searchResults) {
      const visibleBooks = this.applyFilters();
      this.searchResults.setBooks(visibleBooks);
    }
  }

  render() {
    this.container = createElement({
      tag: 'section',
      className: styles.page,
    });

    this.searchIntro = new SearchIntro({
      onSearch: (query) => this.handleSearch(query),
      onAuthorChange: (author) => {
        this.selectedAuthor = author || null;
        const visibleBooks = this.applyFilters();
        this.searchResults.setBooks(visibleBooks);
      },
    });

    this.resultsWrap = createElement({
      tag: 'div',
      className: styles.searchResults,
    });

    this.statusEl = createElement({
      tag: 'p',
      className: styles.searchResultsStatus,
    });

    this.searchResults = new SearchResults({
      isFavorite: (id) => favoritesService.isFavorite(id),
    });

    this.placeholderWrap = new SearchPlaceholder().render();

    this.resultsWrap.append(this.placeholderWrap, this.statusEl, this.searchResults.render());
    this.resultsWrap.addEventListener('click', this._handleResultsClick);

    this.favoritesWrap = createElement({
      tag: 'div',
      className: styles.favoritesWrap,
      attrs: { 'data-favorites-wrap': 'true' },
    });

    this.favoritesWrap.append(new Favorites().render());
    this.favoritesWrap.addEventListener('click', this._handleFavoritesClick);

    const contentRow = createElement({
      tag: 'div',
      className: styles.contentRow,
      children: [
        createElement({
          tag: 'div',
          className: styles.resultsColumn,
          children: [this.resultsWrap],
        }),
        this.favoritesWrap,
      ],
    });

    this.container.append(this.searchIntro.render(), contentRow);

    return this.container;
  }
}
