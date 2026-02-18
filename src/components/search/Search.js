import { BUTTON_TEXT, TEXT_CONSTANTS } from '@/constants';
import { createElement, createSearchIcon } from '@/utils';

import styles from './Search.module.css';

export class Search {
  constructor({ onSearch = () => {} }) {
    this.onSearch = onSearch;
    this.input = null;
  }

  getQuery() {
    return this.input ? this.input.value.trim() : '';
  }

  setLoading(isLoading) {
    if (!this.button) return;
    this.button.disabled = isLoading;
    this.button.textContent = isLoading ? BUTTON_TEXT.SEARCHING : BUTTON_TEXT.SEARCH;
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

    this.button = createElement({
      tag: 'button',
      className: styles.searchFormBtn,
      attrs: { type: 'submit' },
      text: BUTTON_TEXT.SEARCH,
    });

    const form = createElement({
      tag: 'form',
      className: styles.searchForm,
      children: [inputWrap, this.button],
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSearch(this.getQuery());
    });

    return form;
  }
}
