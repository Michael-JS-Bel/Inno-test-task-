import { BookPage, NotFoundPage, SearchPage } from '@/pages';

import { ROUTERS } from './constants.js';

export class Router {
  constructor({ onRouteChange }) {
    this.onRouteChange = onRouteChange || (() => {});
    this.handlePopState = this.handlePopState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.currentPage = null;
  }

  getCurrentPage() {
    return this.currentPage;
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
    this.currentPage?.destroy?.();

    const segments = this.getSegments();

    if (segments.length === 0 || segments[0] === 'search') {
      this.currentPage = new SearchPage();
      return this.currentPage.render();
    }

    if (segments[0] === 'book') {
      const bookId = segments[1] || null;
      this.currentPage = new BookPage(bookId);
      return this.currentPage.render();
    }

    this.currentPage = new NotFoundPage();
    return this.currentPage.render();
  }
}
