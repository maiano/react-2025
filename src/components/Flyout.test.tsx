import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { Flyout } from './Flyout';
import { downloadCharactersCSV } from '@/shared/utils/download-characters-csv';
import { generateCSV } from '@/shared/utils/generate-csv';
import { useSelectedCharactersStore } from '@/store/selectedCharactersStore';
import type { SelectedCharactersState } from '@/store/selectedCharactersStore';
import { mockCharacter } from '@/tests/mockCharacter';

vi.mock('@/shared/utils/download-characters-csv');
vi.mock('@/shared/utils/generate-csv');
vi.mock('@/store/selectedCharactersStore', () => ({
  useSelectedCharactersStore: vi.fn(),
}));

const mockUseSelectedCharactersStore = vi.mocked(useSelectedCharactersStore);

describe('Flyout', () => {
  const mockUnselectAll = vi.fn();
  const mockGetSelectedArray = vi.fn(() => [mockCharacter]);
  const mockCSVResult = {
    csvContent: 'test,csv,content',
    fileName: 'characters.csv',
  };

  beforeEach(() => {
    mockUseSelectedCharactersStore.mockImplementation((selector) => {
      const state: SelectedCharactersState = {
        selectedMap: new Map([[mockCharacter.id, mockCharacter]]),
        toggleCharacter: vi.fn(),
        isSelected: vi.fn(),
        unselectAll: mockUnselectAll,
        getSelectedArray: mockGetSelectedArray,
      };
      return selector(state);
    });

    vi.mocked(generateCSV).mockResolvedValue(mockCSVResult);
    vi.mocked(downloadCharactersCSV).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when no characters selected', () => {
    mockUseSelectedCharactersStore.mockImplementation((selector) => {
      const state: SelectedCharactersState = {
        selectedMap: new Map(),
        toggleCharacter: vi.fn(),
        isSelected: vi.fn(),
        unselectAll: mockUnselectAll,
        getSelectedArray: () => [],
      };
      return selector(state);
    });

    const { container } = render(<Flyout />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should call generateCSV and download with selected characters', async () => {
    render(<Flyout />);
    await userEvent.click(screen.getByText('Download'));

    expect(mockGetSelectedArray).toHaveBeenCalled();
    expect(generateCSV).toHaveBeenCalledWith([mockCharacter]);
    expect(downloadCharactersCSV).toHaveBeenCalledWith(
      'test,csv,content',
      'characters.csv',
    );
  });

  it('should call unselectAll when button clicked', async () => {
    render(<Flyout />);
    await userEvent.click(screen.getByText('Unselect all'));

    expect(mockUnselectAll).toHaveBeenCalled();
  });
});
