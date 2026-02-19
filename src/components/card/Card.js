import { createElement, createHeartIcon } from '@/utils';

import styles from './Card.module.css';

const COVER_BASE = 'https://covers.openlibrary.org/b/id';

function getCoverUrl(coverId) {
  if (!coverId) return null;
  return `${COVER_BASE}/${coverId}.jpg`;
}

export class Card {
  constructor(book, { onAddToFavorites, isFavorite }) {
    this.book = book;
    this.onAddToFavorites = onAddToFavorites || (() => {});
    this.isFavorite = isFavorite;
  }

  render() {
    const coverUrl = getCoverUrl(this.book.coverId);
    const card = createElement({
      tag: 'article',
      className: styles.bookCard,
    });

    const coverWrap = createElement({
      tag: 'div',
      className: styles.bookCardCoverWrap,
    });

    if (coverUrl) {
      const img = createElement({
        tag: 'img',
        className: styles.bookCardCover,
        attrs: {
          src: coverUrl,
          alt: this.book.title,
        },
      });
      coverWrap.append(img);
    } else {
      const placeholder = createElement({
        tag: 'div',
        className: styles.bookCardPlaceholder,
        text: 'No cover',
      });
      coverWrap.append(placeholder);
    }

    const body = createElement({
      tag: 'div',
      className: styles.bookCardBody,
    });

    const title = createElement({
      tag: 'h3',
      className: styles.bookCardTitle,
      text: this.book.title,
    });

    const author = createElement({
      tag: 'p',
      className: styles.bookCardAuthor,
      text: this.book.authorName,
    });

    const year = createElement({
      tag: 'p',
      className: styles.bookCardYear,
      text: this.book.firstPublishYear ? String(this.book.firstPublishYear) : '—',
    });

    body.append(title, author, year);

    const favBtn = createElement({
      tag: 'button',
      className: styles.bookCardFav,
      attrs: {
        type: 'button',
      },
    });

    const updateButton = () => {
      favBtn.textContent = '';
      favBtn.append(createHeartIcon(styles, this.isFavorite));
    };

    updateButton();

    favBtn.addEventListener('click', () => {
      this.onAddToFavorites(this.book);
    });

    card.append(coverWrap, body, favBtn);

    return card;
  }
}
