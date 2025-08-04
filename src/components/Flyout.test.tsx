/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { Flyout } from './Flyout';
import { downloadCharactersCSV } from '@/shared/utils/download-characters-csv';
import { useSelectedCharactersStore } from '@/store/selectedCharactersStore';

import { mockCharacter } from '@/tests/mockCharacter';

vi.mock('@/store/selectedCharactersStore');
vi.mock('@/shared/utils/download-characters-csv');

describe('Flyout', () => {
  const mockUnselectAll = vi.fn();
  const mockGetSelectedArray = vi.fn(() => [mockCharacter]);

  beforeEach(() => {
    useSelectedCharactersStore.mockImplementation((selector) => {
      return selector({
        selectedMap: new Map([[mockCharacter.id, mockCharacter]]),
        getSelectedArray: mockGetSelectedArray,
        unselectAll: mockUnselectAll,
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when no characters selected', () => {
    useSelectedCharactersStore.mockImplementation((selector) => {
      return selector({
        selectedMap: new Map(),
        getSelectedArray: () => [],
        unselectAll: mockUnselectAll,
      });
    });

    const { container } = render(<Flyout />);
    expect(container).toBeEmptyDOMElement();
  });

  // it('should render selected count and buttons', () => {
  //   render(<Flyout />);

  //   expect(screen.getByText(/1 items selected/i)).toBeInTheDocument();
  //   expect(screen.getByText('Download')).toBeInTheDocument();
  //   expect(screen.getByText('Unselect all')).toBeInTheDocument();
  // });

  it('should call download with selected characters', async () => {
    render(<Flyout />);
    await userEvent.click(screen.getByText('Download'));

    expect(downloadCharactersCSV).toHaveBeenCalledWith([mockCharacter]);
    expect(mockGetSelectedArray).toHaveBeenCalled();
  });

  it('should call unselectAll when button clicked', async () => {
    render(<Flyout />);
    await userEvent.click(screen.getByText('Unselect all'));

    expect(mockUnselectAll).toHaveBeenCalled();
  });
});
