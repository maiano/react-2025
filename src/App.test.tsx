import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

describe('App component', () => {
  it('renders components', () => {
    render(<App />);
    expect(screen.getByText(UI_STRINGS.title)).toBeInTheDocument();
  });

  it('throws the error with the button and shows fallback UI', () => {
    render(<App />);
    const errorButton = screen.getByText(UI_STRINGS.errorButton);
    fireEvent.click(errorButton);
    expect(screen.getByText(ERROR_UI_STRINGS.heading)).toBeInTheDocument();
  });
});
