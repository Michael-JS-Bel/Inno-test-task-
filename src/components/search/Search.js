import { TEXT_CONSTANTS } from '@/constants';
import {
  createElement,
  createSearchIcon,
  debounce,
  loadSearchQuery,
  saveSearchQuery,
} from '@/utils';

import styles from './Search.module.css';

export class Search {
  constructor({ onSearch = () => {}, onAuthorChange = () => {}, minLength = 3, delay = 400 }) {
    this.onSearch = onSearch;
    this.onAuthorChange = onAuthorChange;
    this.minLength = minLength;
    this.delay = delay;

    this.input = null;
    this.authorSelect = null;
    this.authors = [];

    this.debouncedSearch = debounce((query) => {
      this.onSearch(query);
    }, this.delay);
  }

  getQuery() {
    return this.input ? this.input.value.trim() : '';
  }

  setFiltersEnabled(enabled) {
    if (this.filterBtn) {
      this.filterBtn.disabled = !enabled;
    }

    if (this.authorSelect) {
      this.authorSelect.disabled = !enabled || this.authors.length === 0;
    }
  }

  setAuthors(authors) {
    this.authors = Array.isArray(authors) ? authors : [];

    if (!this.authorSelect) return;

    this.authorSelect.textContent = '';

    const defaultOption = createElement({
      tag: 'option',
      attrs: { value: '' },
      text: TEXT_CONSTANTS.ALL_AUTHORS,
    });
    this.authorSelect.append(defaultOption);

    for (const author of this.authors) {
      this.authorSelect.append(
        createElement({
          tag: 'option',
          attrs: { value: author },
          text: author,
        })
      );
    }

    this.setFiltersEnabled(this.authors.length > 0);
  }

  render() {
    const icon = createSearchIcon(styles);

    const inputWrap = createElement({
      tag: 'div',
      className: styles.searchFormInputWrap,
      children: [icon],
    });

    this.input = createElement({
      tag: 'input',
      className: styles.searchFormInput,
      attrs: {
        type: 'search',
        placeholder: TEXT_CONSTANTS.SEARCH_PLACEHOLDER,
        autocomplete: 'off',
      },
    });

    inputWrap.append(this.input);

    this.authorSelect = createElement({
      tag: 'select',
      className: styles.searchFormAuthorSelect,
      attrs: { disabled: true },
    });

    this.authorSelect.addEventListener('change', () => {
      const value = this.authorSelect.value;
      this.onAuthorChange(value || null);
    });

    const form = createElement({
      tag: 'div',
      className: styles.searchForm,
      children: [this.authorSelect, inputWrap],
    });

    this.input.addEventListener('input', () => {
      const query = this.getQuery();

      saveSearchQuery(query);

      if (query.length === 0) {
        this.onSearch('');
        return;
      }

      if (query.length < this.minLength) {
        return;
      }

      this.debouncedSearch(query);
    });

    const saved = loadSearchQuery();
    if (saved && this.input) {
      this.input.value = saved;
      const query = this.getQuery();
      if (query.length === 0) {
        this.onSearch('');
      } else if (query.length >= this.minLength) {
        this.onSearch(query);
      }
    }

    return form;
  }
}
