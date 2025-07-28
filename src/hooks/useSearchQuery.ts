const SEARCH_KEY = 'rick-and-morty-search';

export const useSearchQuery = () => {
  const get = () => localStorage.getItem(SEARCH_KEY) || '';
  const set = (value: string) => localStorage.setItem(SEARCH_KEY, value);

  return { get, set };
};
