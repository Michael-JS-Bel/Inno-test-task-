import { createElement } from '@/utils';

import styles from './Footer.module.css';

export class Footer {
  render() {
    const text = createElement({
      tag: 'p',
      className: styles.text,
      text: 'Powered by Open Library',
    });

    const inner = createElement({
      tag: 'div',
      className: styles.inner,
      children: [text],
    });

    const element = createElement({
      tag: 'footer',
      className: styles.footer,
      children: [inner],
    });

    return element;
  }
}
