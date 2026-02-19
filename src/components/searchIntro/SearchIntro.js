import { Search } from '@/components/search';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';

import styles from './SearchIntro.module.css';

export class SearchIntro {
  constructor({ onSearch }) {
    this.onSearch = onSearch;
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
    });

    const formWrap = createElement({
      tag: 'div',
      className: styles.searchIntroForm,
      children: [this.searchForm.render()],
    });

    container.append(title, subtitle, formWrap);

    return container;
  }

  setLoading(value) {
    this.searchForm?.setLoading(value);
  }
}
