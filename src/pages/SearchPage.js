import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';

class SearchPage {
  render() {
    const heading = createElement({
      tag: 'h2',
      text: TEXT_CONSTANTS.SEARCH_BOOK,
    });

    const container = createElement({
      tag: 'section',
      className: 'page',
      children: [heading],
    });

    return container;
  }
}

export default SearchPage;
