import { Search } from '@/components/search';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';

class SearchPage {
  render() {
    const heading = createElement({
      tag: 'h2',
      text: TEXT_CONSTANTS.SEARCH_BOOK,
    });

    const search = new Search({
      onSearch: (query) => {
        console.log(query);
      },
    }).render();

    const container = createElement({
      tag: 'section',
      className: 'page',
      children: [heading, search],
    });

    return container;
  }
}

export default SearchPage;
