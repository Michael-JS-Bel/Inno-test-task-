import { STORAGE_KEYS } from '@/constants';

export const favoritesService = {
  get() {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  },

  save(favs) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    globalThis.dispatchEvent(new CustomEvent('favorites-changed'));
  },

  toggle(book) {
    const favs = this.get();
    const index = favs.findIndex((b) => b.id === book.id);

    if (index === -1) {
      favs.push(book);
    } else {
      favs.splice(index, 1);
    }

    this.save(favs);
  },

  isFavorite(id) {
    return this.get().some((b) => b.id === id);
  },
};
