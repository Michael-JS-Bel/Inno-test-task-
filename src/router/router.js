import { BookPage, NotFoundPage, SearchPage } from '@/pages';

import { ROUTERS } from './constants.js';

export class router {
  constructor({ onRouteChange }) {
    this.onRouteChange = onRouteChange || (() => {});
    this.handlePopState = this.handlePopState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getSegments() {
    const pathname = globalThis.location.pathname;
    const path = pathname === ROUTERS.HOME ? ROUTERS.SEARCH : pathname;
    const segments = path.split('/').filter(Boolean);
    return segments;
  }

  navigateTo(path) {
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    if (globalThis.location.pathname === fullPath) return;

    globalThis.history.pushState(null, '', fullPath);
    this.onRouteChange();
  }

  start() {
    globalThis.addEventListener('popstate', this.handlePopState);
    document.addEventListener('click', this.handleClick);
  }

  stop() {
    globalThis.removeEventListener('popstate', this.handlePopState);
    document.removeEventListener('click', this.handleClick);
  }

  handlePopState() {
    this.onRouteChange();
  }

  handleClick(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;

    const link = event.target.closest('a');
    if (!link || !link.href) return;
    if (link.target === '_blank') return;
    if (link.origin !== globalThis.location.origin) return;
    if (link.pathname === globalThis.location.pathname) return;

    event.preventDefault();
    this.navigateTo(link.pathname);
  }

  render() {
    const segments = this.getSegments();

    if (segments.length === 0 || segments[0] === 'search') {
      const page = new SearchPage();
      return page.render();
    }

    if (segments[0] === 'book') {
      const bookId = segments[1] || null;
      const page = new BookPage(bookId);
      return page.render();
    }

    const page = new NotFoundPage();
    return page.render();
  }
}
