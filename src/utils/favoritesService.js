const FAVORITES_KEY = 'book-catalog-favorites';

export const favoritesService = {
  get() {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(favs) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
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
