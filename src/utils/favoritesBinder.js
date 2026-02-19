export function bindFavoritesChanged(updateFavoritesView) {
  globalThis.addEventListener('favorites-changed', updateFavoritesView);
}
