export function filterBooksByAuthor(books, selectedAuthor) {
  if (!Array.isArray(books) || books.length === 0) {
    return [];
  }

  if (!selectedAuthor) {
    return books;
  }

  return books.filter((book) =>
    Array.isArray(book.authors)
      ? book.authors.includes(selectedAuthor)
      : book.authorName === selectedAuthor
  );
}

export function extractAuthors(books) {
  if (!Array.isArray(books) || books.length === 0) {
    return [];
  }

  return [
    ...new Set(
      books
        .flatMap((book) =>
          Array.isArray(book.authors) && book.authors.length > 0
            ? book.authors
            : book.authorName
              ? [book.authorName]
              : []
        )
        .filter((name) => typeof name === 'string' && name.trim().length > 0)
    ),
  ];
}
