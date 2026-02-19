import { createElement, createHeartIcon, formatPublishYear, getCoverUrl } from '@/utils';

import styles from './FavoriteCard.module.css';

export class FavoriteCard {
  constructor(book, { onRemove }) {
    this.book = book;
    this.onRemove = onRemove || (() => {});
  }

  render() {
    const coverUrl = getCoverUrl(this.book.coverId);
    const card = createElement({
      tag: 'div',
      className: styles.favoriteCard,
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
        text: 'No cover',
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

    favBtn.addEventListener('click', () => this.onRemove(this.book));

    card.append(coverWrap, body, favBtn);

    return card;
  }
}
