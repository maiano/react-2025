import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { UI_STRINGS } from '@/shared/constants/ui-strings';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

it('renders loading spinner with correct alt text', () => {
  render(<LoadingSpinner />);
  const img = screen.getByAltText(UI_STRINGS.altLoading);
  expect(img).toBeInTheDocument();
  expect(img).toHaveClass('animate-spin');
});
