export class SearchController {
  constructor(searchService) {
    this.searchService = searchService;

    this.state = 'idle';
    this.books = [];

    this.abortController = null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  notify() {
    const snapshot = {
      state: this.state,
      books: this.books,
    };

    for (const listener of this.listeners) listener(snapshot);
  }

  async search(query) {
    if (!query || query.length < 3) {
      this.state = 'idle';
      this.books = [];
      this.notify();
      return;
    }

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    this.state = 'loading';
    this.notify();

    try {
      const books = await this.searchService(query, {
        signal: this.abortController.signal,
      });

      this.books = books;
      this.state = books.length > 0 ? 'success' : 'empty';
    } catch (error) {
      if (error.name === 'AbortError') return;

      this.state = 'error';
      this.books = [];
    }

    this.notify();
  }
}
