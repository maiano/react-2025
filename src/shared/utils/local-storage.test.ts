import { describe, it, expect, beforeEach } from 'vitest';
import { searchStorage } from './local-storage';

const TEST_KEY = 'rick-and-morty-search';

describe('searchStorage tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty string', () => {
    expect(searchStorage.get()).toBe('');
  });

  it('set and get value', () => {
    searchStorage.set('Summer');
    expect(localStorage.getItem(TEST_KEY)).toBe('Summer');
    expect(searchStorage.get()).toBe('Summer');
  });
});
