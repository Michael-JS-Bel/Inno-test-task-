import { FavoriteCard } from '@/components/favoriteCard';
import { FAVORITES_CONSTANTS } from '@/constants';
import { createElement, createHeartIcon } from '@/utils';
import { favoritesService } from '@/utils/favoritesService';

import styles from './Favorites.module.css';

export class Favorites {
  render() {
    const books = favoritesService.get();
    const count = books.length;

    const sidebar = createElement({
      tag: 'aside',
      className: styles.favorites,
    });

    const headerIcon = createElement({
      tag: 'span',
      className: styles.headerHeartIcon,
    });
    headerIcon.append(createHeartIcon(styles, true));

    const header = createElement({
      tag: 'div',
      className: styles.header,
      children: [
        headerIcon,
        createElement({
          tag: 'h2',
          className: styles.title,
          text: FAVORITES_CONSTANTS.TITLE,
        }),
      ],
    });

    const countEl = createElement({
      tag: 'p',
      className: styles.count,
      text: FAVORITES_CONSTANTS.BOOKS_SAVED(count),
    });

    const list = createElement({
      tag: 'div',
      className: styles.list,
    });

    if (books.length === 0) {
      list.append(
        createElement({
          tag: 'p',
          className: styles.empty,
          text: FAVORITES_CONSTANTS.EMPTY,
        })
      );
    } else {
      for (const book of books) {
        const card = new FavoriteCard(book, {
          onRemove: () => favoritesService.toggle(book),
        }).render();
        list.append(card);
      }
    }

    sidebar.append(header, countEl, list);

    return sidebar;
  }
}
