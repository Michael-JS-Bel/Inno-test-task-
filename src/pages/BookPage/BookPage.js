import { getBookById } from '@/api/api';
import { SelectedBookContent } from '@/components';
import { TEXT_CONSTANTS } from '@/constants';
import { ROUTERS } from '@/router';
import { createElement } from '@/utils';

import styles from './BookPage.module.css';

export class BookPage {
  constructor(bookId) {
    this.bookId = bookId || null;
    this.container = null;
    this.state = 'loading';
    this.book = null;

    this.stateEl = null;
    this.contentEl = null;
  }

  async load() {
    if (!this.bookId) {
      this.setState('error');
      return;
    }

    try {
      this.book = await getBookById(this.bookId);
      this.setState('success');
    } catch {
      this.setState('error');
    }
  }

  setState(state) {
    this.state = state;
    this.renderState();
  }

  renderState() {
    if (!this.stateEl || !this.contentEl) return;

    if (this.state === 'loading') {
      this.stateEl.textContent = TEXT_CONSTANTS.LOADING;
      this.stateEl.style.display = '';
      this.contentEl.style.display = 'none';
      return;
    }

    if (this.state === 'error') {
      this.stateEl.textContent = TEXT_CONSTANTS.BOOK_ERROR;
      this.stateEl.style.display = '';
      this.contentEl.style.display = 'none';
      return;
    }

    this.stateEl.style.display = 'none';
    this.contentEl.style.display = '';

    this.contentEl.textContent = '';

    const bookContent = new SelectedBookContent(this.book);
    this.contentEl.append(bookContent.render());
  }

  render() {
    this.container = createElement({
      tag: 'section',
      className: styles.page,
    });

    const backWrap = createElement({
      tag: 'div',
      className: styles.backWrap,
      children: [
        createElement({
          tag: 'a',
          className: styles.backBtn,
          attrs: { href: ROUTERS.SEARCH },
          text: TEXT_CONSTANTS.BACK,
        }),
      ],
    });

    this.stateEl = createElement({
      tag: 'p',
      className: styles.stateMessage,
      text: TEXT_CONSTANTS.BOOK_LOADING,
    });

    this.contentEl = createElement({
      tag: 'div',
      style: 'display: none',
    });

    this.container.append(backWrap, this.stateEl, this.contentEl);

    this.load();

    return this.container;
  }
}
