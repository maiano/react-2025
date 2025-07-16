import { describe, beforeEach, vi, it, expect } from 'vitest';
import { fetchCharacters } from './fetch-сharacters';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import { mockCharacters } from '@/tests/mockCharacters';
import type { CharacterApiResponse } from '@/types/character';

const mockResponse = mockCharacters as CharacterApiResponse;

describe('fetchCharacters', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('fetches characters', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchCharacters('Rick');
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Rick'));
  });

  it('throws error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    await expect(fetchCharacters('unknown')).rejects.toThrow(
      ERROR_UI_STRINGS.notFound,
    );
  });
});
