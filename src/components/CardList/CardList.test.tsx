import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from './CardList';
import { mockCharacters } from '@/tests/mockCharacters';
import type { Character } from '@/types/character';

describe('CardList component', () => {
  const mockItems = mockCharacters.results.slice(1, 3) as Character[];

  it('renders correct number of cards', () => {
    render(<CardList items={mockItems} />);

    expect(screen.getByText('Black Rick')).toBeInTheDocument();
    expect(screen.getByText('Cool Rick')).toBeInTheDocument();

    expect(screen.getAllByText(/species/i)).toHaveLength(2);
  });

  it('renders "no results" with empty array', () => {
    render(<CardList items={[]} />);
    expect(screen.queryByText('Black Rick')).not.toBeInTheDocument();
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
