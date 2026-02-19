import { Footer, Header } from '@/components';
import { Router } from '@/router';
import { createElement } from '@/utils';

import styles from './App.module.css';

export class App {
  static getRootElement() {
    const fromDom = document.querySelector('#app');
    return fromDom || document.body;
  }

  constructor() {
    this.rootElement = App.getRootElement();
    this.router = new Router({
      onRouteChange: () => this.renderCurrentPage(),
    });
    this.mainElement = null;
  }

  run() {
    this.renderLayout();
    this.renderCurrentPage();
    this.router.start();
  }

  renderLayout() {
    this.rootElement.textContent = '';

    const header = new Header().render();
    this.mainElement = createElement({
      tag: 'main',
      className: styles.appContent,
    });
    const footer = new Footer().render();

    const appWrapper = createElement({
      tag: 'div',
      className: styles.app,
      children: [header, this.mainElement, footer],
    });

    this.rootElement.append(appWrapper);
  }

  renderCurrentPage() {
    if (!this.mainElement) return;

    this.mainElement.textContent = '';
    const pageElement = this.router.render();
    if (pageElement) {
      this.mainElement.append(pageElement);
    }
  }
}
