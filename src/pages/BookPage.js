import { TEXT_CONSTANTS } from '@/constants';
import { ROUTERS } from '@/router';
import { createElement } from '@/utils';

class BookPage {
  constructor(bookId) {
    this.bookId = bookId || null;
  }

  render() {
    const heading = createElement({
      tag: 'h2',
      text: TEXT_CONSTANTS.SELECTED_BOOK,
    });

    const backLink = createElement({
      tag: 'a',
      attrs: { href: ROUTERS.SEARCH },
      text: TEXT_CONSTANTS.BACK,
    });

    const backParagraph = createElement({
      tag: 'p',
      children: [backLink],
    });

    const container = createElement({
      tag: 'section',
      className: 'page',
      children: [heading, backParagraph],
    });

    return container;
  }
}

export default BookPage;
