import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HomePage } from './HomePage';
import { fetchCharacters } from '@/shared/utils/fetch-сharacters';
import { searchStorage } from '@/shared/utils/local-storage';
import { mockCharacters } from '@/tests/mockCharacters';
import type { CharacterApiResponse } from '@/types/character';

vi.mock('@/shared/utils/fetch-сharacters');
vi.mock('@/shared/utils/local-storage', () => ({
  searchStorage: {
    get: vi.fn(() => ''),
    set: vi.fn(),
  },
}));

const mockResponse = mockCharacters as CharacterApiResponse;

const renderHomePage = () => render(<HomePage />);
const mockSuccessResponse = () =>
  vi.mocked(fetchCharacters).mockResolvedValue(mockResponse);

describe('HomePage tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders characters from API on mount', async () => {
    mockSuccessResponse();
    renderHomePage();

    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(mockResponse.results[0].name),
      ).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    vi.mocked(fetchCharacters).mockRejectedValue(new Error('network error'));

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('shows spinner', async () => {
    mockSuccessResponse();
    renderHomePage();

    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByAltText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('loads initial search query from localStorage', async () => {
    vi.mocked(searchStorage.get).mockReturnValue('Summer');
    mockSuccessResponse();
    renderHomePage();

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledWith('Summer', 1);
    });
  });
});
