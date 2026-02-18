import { TEXT_CONSTANTS } from '@/constants';
import { ROUTERS } from '@/router';
import { createElement } from '@/utils';

import styles from './Header.module.css';

function createLogoIcon() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 48 48');
  svg.setAttribute('class', styles.headerLogoIcon);
  svg.setAttribute('aria-hidden', 'true');

  const rect = document.createElementNS(ns, 'rect');
  rect.setAttribute('x', '2');
  rect.setAttribute('y', '2');
  rect.setAttribute('width', '44');
  rect.setAttribute('height', '44');
  rect.setAttribute('rx', '8');
  rect.setAttribute('fill', '#2d5a4a');

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', 'M14 14L24 10L34 14V30L24 34L14 30V14ZM24 10V34');
  path.setAttribute('stroke', '#fff');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linejoin', 'round');

  svg.append(rect);
  svg.append(path);
  return svg;
}

class Logo {
  render() {
    const link = createElement({
      tag: 'a',
      className: styles.headerLogo,
      attrs: { href: ROUTERS.SEARCH },
    });

    const icon = createLogoIcon();
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

    link.append(iconWrap);
    link.append(textBlock);
    return link;
  }
}

export default Logo;
