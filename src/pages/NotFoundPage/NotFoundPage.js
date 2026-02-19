import { TEXT_CONSTANTS } from '@/constants';
import { ROUTERS } from '@/router';
import { createElement } from '@/utils';

export class NotFoundPage {
  render() {
    const heading = createElement({
      tag: 'h2',
      text: TEXT_CONSTANTS.PAGE_NOT_FOUND,
    });

    const link = createElement({
      tag: 'a',
      attrs: { href: ROUTERS.SEARCH },
      text: TEXT_CONSTANTS.GO_TO_SEARCH,
    });

    const paragraph = createElement({
      tag: 'p',
      children: [link],
    });

    const container = createElement({
      tag: 'section',
      className: 'page',
      children: [heading, paragraph],
    });

    return container;
  }
}
