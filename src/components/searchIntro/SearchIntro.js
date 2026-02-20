import { Search } from '@/components/search';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';

import styles from './SearchIntro.module.css';

export class SearchIntro {
  constructor({ onSearch, onAuthorChange }) {
    this.onSearch = onSearch;
    this.onAuthorChange = onAuthorChange;
  }

  render() {
    const container = createElement({
      tag: 'div',
      className: styles.searchIntro,
    });

    const title = createElement({
      tag: 'h2',
      className: styles.searchIntroTitle,
      text: TEXT_CONSTANTS.SEARCH_TITLE,
    });

    const subtitle = createElement({
      tag: 'p',
      className: styles.searchIntroSubtitle,
      text: TEXT_CONSTANTS.SEARCH_SUBTITLE,
    });

    this.searchForm = new Search({
      onSearch: this.onSearch,
      onAuthorChange: this.onAuthorChange,
    });

    const formWrap = createElement({
      tag: 'div',
      className: styles.searchIntroForm,
      children: [this.searchForm.render()],
    });

    container.append(title, subtitle, formWrap);

    return container;
  }

  setFiltersEnabled(value) {
    this.searchForm?.setFiltersEnabled(value);
  }

  setAuthors(authors) {
    this.searchForm?.setAuthors(authors);
  }
}
