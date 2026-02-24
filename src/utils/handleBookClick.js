export function handleBookClick({ event, getBooks, onToggle }) {
  const card = event.target.closest('[data-book-id]');
  const btn = event.target.closest('button');

  if (!card || !btn || !card.contains(btn)) return;

  const id = card.dataset.bookId;
  const book = getBooks().find((b) => b.id === id);

  if (!book) return;

  onToggle(book);
}
