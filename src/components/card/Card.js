import { getCoverUrl } from '@/api/config';
import { TEXT_CONSTANTS } from '@/constants';
import { ROUTERS } from '@/router';
import { createElement, createHeartIcon, formatPublishYear } from '@/utils';

import styles from './Card.module.css';

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
        text: TEXT_CONSTANTS.NO_COVER,
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
      text: formatPublishYear(this.book.firstPublishYear),
    });

    body.append(title, author, year);

    const link = createElement({
      tag: 'a',
      className: styles.bookCardLink,
      attrs: {
        href: ROUTERS.BOOK(this.book.id),
      },
      children: [coverWrap, body],
    });

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

    card.append(link, favBtn);

    return card;
  }
}
