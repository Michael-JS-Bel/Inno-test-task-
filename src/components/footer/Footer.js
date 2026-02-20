import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';

import styles from './Footer.module.css';

export class Footer {
  render() {
    const text = createElement({
      tag: 'p',
      className: styles.text,
      text: TEXT_CONSTANTS.POWERED_BY_OP_LI,
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
