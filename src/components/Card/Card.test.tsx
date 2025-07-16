import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';
import { CARD_TEXT } from '@/shared/constants/cards';
import { mockCharacters } from '@/tests/mockCharacters';
import type { Character } from '@/types/character';

const rickCharacter = mockCharacters.results[0] as Character;

describe('Card Component', () => {
  it('renders character name and basic info', () => {
    const { label } = CARD_TEXT;

    render(<Card character={rickCharacter} />);
    expect(screen.getByText(rickCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${label.species}: ${rickCharacter.species}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${label.status}: ${rickCharacter.status}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${label.gender}: ${rickCharacter.gender}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${label.origin}: ${rickCharacter.origin.name}`),
    ).toBeInTheDocument();
  });

  it('handles unknown status and gender gracefully', () => {
    const { label, fallback } = CARD_TEXT;

    const unknownCharacter = {
      ...rickCharacter,
      status: 'unknown',
      gender: 'unknown',
    } as Character;
    render(<Card character={unknownCharacter} />);
    expect(
      screen.getByText(`${label.status}: ${fallback.status}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${label.gender}: ${fallback.gender}`),
    ).toBeInTheDocument();
  });

  it('falls back to location when origin is unknown', () => {
    const noOriginCharacter = {
      ...rickCharacter,
      origin: { name: 'unknown', url: '' },
    };
    render(<Card character={noOriginCharacter} />);
    expect(
      screen.getByText(
        `${CARD_TEXT.fallback.originFallback}: ${rickCharacter.location.name}`,
      ),
    ).toBeInTheDocument();
  });
});
