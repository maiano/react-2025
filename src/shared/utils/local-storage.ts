const SEARCH_KEY = 'rick-and-morty-search';

export const searchStorage = {
  get(): string {
    return localStorage.getItem(SEARCH_KEY) || '';
  },
  set(value: string): void {
    localStorage.setItem(SEARCH_KEY, value);
  },
};
