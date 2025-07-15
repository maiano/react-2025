import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CardList } from './CardList';
import { mockCharacters } from '@/test-utils/mockCharacters';
import type { Character } from '@/types/character';

vi.mock('@/components/Card.tsx', () => ({
  Card: ({ character }: { character: Character }) => (
    <div data-testid="card">{character.name}</div>
  ),
}));

describe('test CardList', () => {
  const mockItems = mockCharacters.results.slice(1, 3) as Character[];

  it('renders correct number of cards', () => {
    render(<CardList items={mockItems} />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Black Rick');
    expect(cards[1]).toHaveTextContent('Cool Rick');
  });

  it('renders "no results"', () => {
    render(<CardList items={[]} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
