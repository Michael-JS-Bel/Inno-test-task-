import searchIcon from '@/assets/searchIcon.webp';
import { TEXT_CONSTANTS } from '@/constants';
import { createElement } from '@/utils';

import styles from './SearchPlaceholder.module.css';

export class SearchPlaceholder {
  constructor({ imageSrc = searchIcon, text } = {}) {
    this.imageSrc = imageSrc;
    this.text = text ?? TEXT_CONSTANTS.SEARCH_HINT;
  }

  render() {
    const container = createElement({
      tag: 'div',
      className: styles.placeholder,
    });

    const img = createElement({
      tag: 'img',
      className: styles.placeholderImage,
      attrs: {
        src: this.imageSrc,
        alt: '',
      },
    });

    const paragraph = createElement({
      tag: 'p',
      className: styles.placeholderText,
      text: this.text,
    });

    container.append(img, paragraph);
    return container;
  }
}
