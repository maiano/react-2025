import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { AboutPage } from '@/pages/AboutPage';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

it('renders about page content', () => {
  render(<AboutPage />);
  expect(screen.getByText(UI_STRINGS.contentAboutPage)).toBeInTheDocument();
});
