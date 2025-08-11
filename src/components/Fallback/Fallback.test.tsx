import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Fallback } from '@/components/Fallback';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';

it('renders fallback content', () => {
  render(<Fallback />);

  expect(
    screen.getByRole('heading', { name: ERROR_UI_STRINGS.heading }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: ERROR_UI_STRINGS.buttonText }),
  ).toBeInTheDocument();
});
