import { searchBooks } from '@/api/api';
import { Favorites, SearchIntro, SearchPlaceholder, SearchResults } from '@/components/';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement, favoritesService } from '@/utils';

import styles from './SearchPage.module.css';

let favoritesListenerBound = false;

export class SearchPage {
  constructor() {
    this.books = [];
    this.state = 'idle';
  }

  handleSearch(query) {
    if (!query || !query.trim()) {
      this.setState('empty', 'Enter search query');
      return;
    }

    this.setState('loading');
    this.searchIntro?.setLoading(true);

    searchBooks(query)
      .then((books) => {
        this.books = books;
        this.searchIntro?.setLoading(false);
        if (books.length === 0) {
          this.setState('empty', 'Nothing found');
        } else {
          this.setState('success');
        }
      })
      .catch(() => {
        this.searchIntro?.setLoading(false);
        this.setState('error', 'Network error');
      });
  }

  setState(state, message = '') {
    this.state = state;
    if (this.placeholderWrap) {
      this.placeholderWrap.style.display = state === 'idle' ? '' : 'none';
    }
    if (this.statusEl) {
      const messages = {
        idle: '',
        loading: TEXT_CONSTANTS.LOADING,
        error: message || 'Network error',
        empty: message || 'Nothing found',
        success: '',
      };
      this.statusEl.textContent = messages[state] || '';
      this.statusEl.style.display = messages[state] ? 'block' : 'none';
    }

    if (state === 'success') {
      this.searchResults.setBooks(this.books);
    } else {
      this.searchResults.setBooks([]);
    }
  }

  toggleToFavorites(book) {
    favoritesService.toggle(book);
    this.setState(this.state);
  }

  render() {
    this.container = createElement({
      tag: 'section',
      className: styles.page,
    });

    this.searchIntro = new SearchIntro({
      onSearch: (query) => this.handleSearch(query),
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
      onAddToFavorites: (book) => this.toggleToFavorites(book),
      isFavorite: (id) => favoritesService.isFavorite(id),
    });

    this.placeholderWrap = new SearchPlaceholder().render();

    this.resultsWrap.append(this.placeholderWrap, this.statusEl, this.searchResults.render());

    bindFavoritesChangedOnce();

    this.favoritesWrap = createElement({
      tag: 'div',
      className: styles.favoritesWrap,
      attrs: { 'data-favorites-wrap': 'true' },
    });
    this.favoritesWrap.append(new Favorites().render());

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

function bindFavoritesChangedOnce() {
  if (favoritesListenerBound) return;
  favoritesListenerBound = true;
  globalThis.addEventListener('favorites-changed', () => {
    const wrap = document.querySelector('[data-favorites-wrap]');
    if (wrap) {
      wrap.textContent = '';
      wrap.append(new Favorites().render());
    }
  });
}
