import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';

import styles from './SelectedBookContent.module.css';

const COVER_BASE = 'https://covers.openlibrary.org/b/id';

function getCoverUrl(coverId) {
  return coverId ? `${COVER_BASE}/${coverId}.jpg` : null;
}

export class SelectedBookContent {
  constructor(book) {
    this.book = book;
    this.element = null;
  }

  render() {
    if (!this.book) return null;

    this.element = createElement({
      tag: 'div',
      className: styles.content,
    });

    const coverUrl = getCoverUrl(this.book.coverId);

    const coverWrap = createElement({
      tag: 'div',
      className: styles.coverWrap,
    });

    if (coverUrl) {
      coverWrap.append(
        createElement({
          tag: 'img',
          className: styles.cover,
          attrs: { src: coverUrl, alt: this.book.title },
        })
      );
    } else {
      coverWrap.append(
        createElement({
          tag: 'div',
          className: styles.coverPlaceholder,
          text: 'No cover',
        })
      );
    }

    const description = createElement({
      tag: 'div',
      className: styles.description,
    });

    description.append(
      createElement({
        tag: 'h1',
        className: styles.title,
        text: this.book.title || TEXT_CONSTANTS.NOT_SPECIFIED,
      }),
      createElement({
        tag: 'p',
        className: styles.author,
        text: this.book.authorName || TEXT_CONSTANTS.NOT_SPECIFIED,
      }),
      createElement({
        tag: 'p',
        className: styles.year,
        text: this.book.firstPublishYear || TEXT_CONSTANTS.NOT_SPECIFIED,
      }),
      createElement({
        tag: 'p',
        className: styles.descriptionText,
        text: this.book.description || TEXT_CONSTANTS.NOT_SPECIFIED,
      })
    );

    this.element.append(coverWrap, description);

    return this.element;
  }
}
