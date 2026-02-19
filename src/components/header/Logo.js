import { TEXT_CONSTANTS } from '@/constants';
import { ROUTERS } from '@/router';
import { createElement, createLogoIcon } from '@/utils';

import styles from './Header.module.css';

export class Logo {
  render() {
    const link = createElement({
      tag: 'a',
      className: styles.headerLogo,
      attrs: { href: ROUTERS.SEARCH },
    });

    const icon = createLogoIcon(styles);
    const iconWrap = createElement({
      tag: 'div',
      className: styles.headerLogoIconWrap,
      children: [icon],
    });

    const title = createElement({
      tag: 'h1',
      className: styles.headerLogoTitle,
      text: TEXT_CONSTANTS.THE_LIBRARY,
    });

    const tagline = createElement({
      tag: 'span',
      className: styles.headerLogoTagline,
      text: TEXT_CONSTANTS.LIBRARY_PREVIEW,
    });

    const textBlock = createElement({
      tag: 'div',
      className: styles.headerLogoText,
      children: [title, tagline],
    });

    link.append(iconWrap, textBlock);
    return link;
  }
}
