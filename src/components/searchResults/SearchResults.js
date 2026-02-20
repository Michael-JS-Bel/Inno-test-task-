import { Card } from '@/components/card';
import { createElement } from '@/utils';

import styles from './SearchResults.module.css';

export class SearchResults {
  constructor({ isFavorite }) {
    this.isFavorite = isFavorite || (() => false);
    this.element = createElement({
      tag: 'div',
      className: styles.searchResultsGrid,
    });
  }

  setBooks(books) {
    this.element.textContent = '';
    if (!Array.isArray(books) || books.length === 0) {
      return;
    }

    for (const book of books) {
      const card = new Card(book, {
        isFavorite: this.isFavorite(book.id),
      }).render();
      this.element.append(card);
    }
  }

  render() {
    return this.element;
  }
}
