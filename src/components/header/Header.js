import { STORAGE_KEYS } from '@/constants';
import { createElement } from '@/utils';

import styles from './Header.module.css';
import { Logo } from './Logo';

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

export class Header {
  element = null;
  themeButton = null;
  getCurrentTheme() {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === THEME_LIGHT || stored === THEME_DARK) return stored;
    return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
  }

  setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    this.updateThemeButton(theme);
  }

  toggleTheme() {
    const current = this.getCurrentTheme();
    const next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    this.setTheme(next);
  }

  updateThemeButton(theme) {
    if (!this.themeButton) return;
    this.themeButton.setAttribute(
      'aria-label',
      theme === THEME_LIGHT ? 'Switch to dark mode' : 'Switch to light mode'
    );
    this.themeButton.textContent = theme === THEME_LIGHT ? '🌙' : '☀️';
    this.themeButton.classList.toggle('headerThemeBtn--dark', theme === THEME_DARK);
    this.themeButton.classList.toggle('headerThemeBtn--light', theme === THEME_LIGHT);
  }

  render() {
    const logo = new Logo().render();

    this.themeButton = createElement({
      tag: 'button',
      className: styles.headerThemeBtn,
      attrs: {
        type: 'button',
        'aria-label': 'Toggle theme',
      },
    });

    this.themeButton.addEventListener('click', () => this.toggleTheme());

    const themeWrapper = createElement({
      tag: 'div',
      className: styles.headerTheme,
      children: [this.themeButton],
    });

    const headerInner = createElement({
      tag: 'div',
      className: styles.headerInner,
      children: [logo, themeWrapper],
    });

    this.element = createElement({
      tag: 'header',
      className: styles.header,
      children: [headerInner],
    });

    this.setTheme(this.getCurrentTheme());

    return this.element;
  }
}
