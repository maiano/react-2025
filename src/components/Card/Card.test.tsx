import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';
import { CARD_TEXT } from '@/shared/constants/cards';
import { mockCharacters } from '@/test-utils/mockCharacters';
import type { Character } from '@/types/character';

const baseCharacter = mockCharacters.results[0] as Character;

describe('Card', () => {
  it('renders character name and basic info', () => {
    render(<Card character={baseCharacter} />);
    expect(screen.getByText(baseCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${CARD_TEXT.label.species}: ${baseCharacter.species}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${CARD_TEXT.label.status}: ${baseCharacter.status}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${CARD_TEXT.label.gender}: ${baseCharacter.gender}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${CARD_TEXT.label.origin}: ${baseCharacter.origin.name}`,
      ),
    ).toBeInTheDocument();
  });

  it('handles unknown status and gender gracefully', () => {
    const unknownCharacter = {
      ...baseCharacter,
      status: 'unknown',
      gender: 'unknown',
    } as Character;
    render(<Card character={unknownCharacter} />);
    expect(
      screen.getByText(
        `${CARD_TEXT.label.status}: ${CARD_TEXT.fallback.status}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${CARD_TEXT.label.gender}: ${CARD_TEXT.fallback.gender}`,
      ),
    ).toBeInTheDocument();
  });

  it('falls back to location when origin is unknown', () => {
    const noOriginCharacter = {
      ...baseCharacter,
      origin: { name: 'unknown', url: '' },
    };
    render(<Card character={noOriginCharacter} />);
    expect(
      screen.getByText(
        `${CARD_TEXT.fallback.originFallback}: ${baseCharacter.location.name}`,
      ),
    ).toBeInTheDocument();
  });
});
