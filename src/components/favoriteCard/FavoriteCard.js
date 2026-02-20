import { getCoverUrl } from '@/api/config';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement, createHeartIcon, formatPublishYear } from '@/utils';

import styles from './FavoriteCard.module.css';

export class FavoriteCard {
  constructor(book) {
    this.book = book;
  }

  render() {
    const coverUrl = getCoverUrl(this.book.coverId);
    const card = createElement({
      tag: 'div',
      className: styles.favoriteCard,
      attrs: { 'data-book-id': this.book.id },
    });

    const coverWrap = createElement({
      tag: 'div',
      className: styles.coverWrap,
    });

    if (coverUrl) {
      const img = createElement({
        tag: 'img',
        className: styles.cover,
        attrs: {
          src: coverUrl,
          alt: this.book.title,
        },
      });
      coverWrap.append(img);
    } else {
      const placeholder = createElement({
        tag: 'div',
        className: styles.coverPlaceholder,
        text: TEXT_CONSTANTS.NO_COVER,
      });
      coverWrap.append(placeholder);
    }

    const body = createElement({
      tag: 'div',
      className: styles.body,
    });

    const title = createElement({
      tag: 'p',
      className: styles.title,
      text: this.book.title,
    });

    const author = createElement({
      tag: 'p',
      className: styles.author,
      text: this.book.authorName,
    });

    const year = createElement({
      tag: 'p',
      className: styles.year,
      text: formatPublishYear(this.book.firstPublishYear),
    });

    body.append(title, author, year);

    const favBtn = createElement({
      tag: 'button',
      className: styles.favBtn,
      attrs: {
        type: 'button',
        'aria-label': 'Remove from favorites',
      },
    });
    favBtn.append(createHeartIcon(styles, true));

    card.append(coverWrap, body, favBtn);

    return card;
  }
}
