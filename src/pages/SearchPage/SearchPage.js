import { searchBooks } from '@/api/api';
import { SearchIntro } from '@/components/searchIntro';
import { SearchResults } from '@/components/searchResults';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';
import { favoritesService } from '@/utils/favoritesService';

import styles from './SearchPage.module.css';

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

    this.resultsWrap.append(this.statusEl, this.searchResults.render());

    this.container.append(this.searchIntro.render(), this.resultsWrap);

    return this.container;
  }
}
