import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CharacterDetails } from './CharacterDetails';
import { mockCharacter } from '@/tests/mockCharacter';

vi.mock('@/hooks/useCharacterQuery', () => ({
  useCharacterQuery: vi.fn().mockImplementation((id) => ({
    data: id === '1' ? mockCharacter : null,
    isLoading: false,
    isError: id === 'error',
  })),
}));

describe('CharacterDetails', () => {
  it('renders character details when data is loaded', async () => {
    render(<CharacterDetails characterId="1" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  it('calls onClose when button is clicked', async () => {
    const onClose = vi.fn();
    render(<CharacterDetails characterId="1" onClose={onClose} />);

    await userEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
